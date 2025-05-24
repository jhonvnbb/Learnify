import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.email'));
    };

    return (
        <GuestLayout>
            <Head title="Lupa Password - Learnify" />

            <div className="min-h-screen bg-[#0f172a] flex items-center justify-center px-4">
                <div className="bg-white/5 border border-white/10 rounded-2xl shadow-2xl backdrop-blur-lg w-full max-w-4xl p-6 sm:p-10 text-white flex flex-col md:flex-row items-center gap-8">

                    <div className="flex-1 flex justify-center">
                        <img
                            src="/images/forgot-password.svg"
                            alt="Forgot Password"
                            className="w-56 md:w-72"
                        />
                    </div>

                    <div className="flex-1 space-y-5">
                        <h2 className="text-2xl sm:text-3xl font-bold text-blue-400">
                            Reset Password
                        </h2>
                        <p className="text-slate-300 text-sm">
                            Masukkan alamat email yang kamu gunakan saat mendaftar, kami akan mengirimkan link untuk mereset password kamu.
                        </p>

                        {status && (
                            <div className="text-sm font-medium text-green-400">
                                {status}
                            </div>
                        )}

                        <form onSubmit={submit} className="space-y-4">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-white mb-1">
                                    Email
                                </label>
                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="w-full bg-white/10 text-white border border-white/20 rounded-xl focus:ring-blue-400 focus:border-blue-400"
                                    isFocused={true}
                                    onChange={(e) =>
                                        setData('email', e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.email}
                                    className="mt-2 text-red-400 text-sm"
                                />
                            </div>

                            <PrimaryButton
                                className="flex items-center justify-center w-full bg-blue-600 hover:bg-blue-700 transition text-white font-semibold py-3 rounded-xl uppercase"
                                disabled={processing}
                            >
                                Kirim Link Reset
                            </PrimaryButton>
                        </form>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
