import { Head, usePage } from '@inertiajs/react';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

export default function Upgrade() {
    const { clientKey, user, isProduction } = usePage().props;
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const initialized = useRef(false);

    // Fungsi untuk mengecek status pembayaran
    const checkStatus = async (orderId) => {
      try {
        const res = await axios.get(`/payment/status/${orderId}`);
        if (res.data.status === 'settlement') {
          setSuccess(true);
          window.location.reload();
        } else if (res.data.status === 'pending') {
          setTimeout(() => checkStatus(orderId), 5000); // Cek lagi setelah 5 detik
        }
      } catch (err) {
        console.error('Status check error:', err);
        setError('Gagal memeriksa status pembayaran');
      }
    };

    // Load Midtrans script
    useEffect(() => {
        if (initialized.current || !clientKey) return;
        initialized.current = true;

        const loadMidtrans = () => {
            return new Promise((resolve, reject) => {
                const script = document.createElement('script');
                script.src = `https://app${isProduction ? '' : '.sandbox'}.midtrans.com/snap/snap.js`;
                script.async = true;
                script.onload = resolve;
                script.onerror = () => reject(new Error('Gagal memuat Midtrans'));
                document.body.appendChild(script);
            });
        };

        loadMidtrans().catch(err => {
            console.error('Error loading Midtrans:', err);
            setError('Sistem pembayaran sedang tidak tersedia');
        });
    }, [clientKey, isProduction]);

    const handleUpgrade = async () => {
        setLoading(true);
        setError(null);
        
        try {
            // 1. Dapatkan CSRF token
            await axios.get('/sanctum/csrf-cookie');
            
            // 2. Buat transaksi
            const response = await axios.post('/payment/create', {}, {
                headers: {
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content || '',
                    'Content-Type': 'application/json'
                }
            });

            // 3. Proses pembayaran
            if (typeof window.snap !== 'undefined') {
                window.snap.pay(response.data.token, {
                    onSuccess: (result) => {
                        // Mulai pengecekan status
                        checkStatus(response.data.order_id);
                    },
                    onPending: (result) => {
                        // Mulai pengecekan status untuk pembayaran pending
                        checkStatus(response.data.order_id);
                    },
                    onError: (error) => {
                        setError(`Pembayaran gagal: ${error.status_message || 'Silakan coba lagi'}`);
                    },
                    onClose: () => {
                        setError('Popup pembayaran ditutup sebelum menyelesaikan pembayaran');
                    }
                });
            }
        } catch (err) {
            setError(err.response?.data?.message || err.message || 'Terjadi kesalahan');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4">
            <Head title="Upgrade to Premium" />
            
            <div className="max-w-md mx-auto bg-white rounded-lg shadow p-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">Upgrade to Premium</h1>
                
                {error && (
                    <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                        {error}
                    </div>
                )}
                
                {success && (
                    <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
                        Pembayaran berhasil! Status Anda akan diperbarui.
                    </div>
                )}

                <div className="mb-6">
                    <p className="text-gray-600 mb-2">
                        Paket saat ini: <span className="font-semibold capitalize">{user.package_type}</span>
                    </p>
                    <p className="text-gray-800 font-medium mb-2">Fitur Premium:</p>
                    <ul className="list-disc pl-5 text-gray-600 space-y-1">
                        <li>Akses semua kursus premium</li>
                        <li>Download materi</li>
                        <li>Sertifikat kelulusan</li>
                        <li>Dukungan prioritas</li>
                    </ul>
                </div>

                <div className="border-t border-gray-200 pt-4">
                    <p className="text-gray-600 mb-4">Total: Rp 100.000</p>
                    
                    <button
                        onClick={handleUpgrade}
                        disabled={loading}
                        className={`w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors ${
                            loading ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                    >
                        {loading ? 'Memproses...' : 'Upgrade Sekarang'}
                    </button>
                </div>
            </div>
        </div>
    );
}