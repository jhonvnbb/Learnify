import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';

export default function ResetPassword({ token, email }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.store'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Reset Password - Learnify" />

            <div className="min-h-screen bg-[#0f172a] flex items-center justify-center px-4">
                <div className="bg-white/5 border border-white/10 rounded-2xl shadow-2xl backdrop-blur-lg w-full max-w-4xl p-6 sm:p-10 text-white flex flex-col md:flex-row items-center gap-8">
   
                    <div className="flex-1 flex justify-center">
                        <img
                            src="/images/reset-password.svg"
                            alt="Reset Password Illustration"
                            className="w-56 md:w-72"
                        />
                    </div>

                    <div className="flex-1 space-y-5">
                        <h2 className="text-2xl sm:text-3xl font-bold text-blue-400">
                            Atur Ulang Password
                        </h2>
                        <p className="text-slate-300 text-sm">
                            Masukkan password baru untuk akun Anda, dan pastikan konfirmasinya sesuai.
                        </p>

                        <form onSubmit={submit} className="space-y-4">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium mb-1 text-white">
                                    Email
                                </label>
                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="w-full bg-white/10 text-white border border-white/20 rounded-xl focus:ring-blue-400 focus:border-blue-400"
                                    autoComplete="username"
                                    onChange={(e) =>
                                        setData('email', e.target.value)
                                    }
                                />
                                <InputError message={errors.email} className="mt-2 text-red-400 text-sm" />
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium mb-1 text-white">
                                    Password Baru
                                </label>
                                <TextInput
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    className="w-full bg-white/10 text-white border border-white/20 rounded-xl focus:ring-blue-400 focus:border-blue-400"
                                    autoComplete="new-password"
                                    isFocused={true}
                                    onChange={(e) =>
                                        setData('password', e.target.value)
                                    }
                                />
                                <InputError message={errors.password} className="mt-2 text-red-400 text-sm" />
                            </div>

                            <div>
                                <label htmlFor="password_confirmation" className="block text-sm font-medium mb-1 text-white">
                                    Konfirmasi Password
                                </label>
                                <TextInput
                                    type="password"
                                    id="password_confirmation"
                                    name="password_confirmation"
                                    value={data.password_confirmation}
                                    className="w-full bg-white/10 text-white border border-white/20 rounded-xl focus:ring-blue-400 focus:border-blue-400"
                                    autoComplete="new-password"
                                    onChange={(e) =>
                                        setData('password_confirmation', e.target.value)
                                    }
                                />
                                <InputError message={errors.password_confirmation} className="mt-2 text-red-400 text-sm" />
                            </div>

                            <PrimaryButton
                                className="flex items-center justify-center w-full bg-blue-600 hover:bg-blue-700 transition text-white font-semibold py-3 rounded-xl uppercase"
                                disabled={processing}
                            >
                                Simpan Password Baru
                            </PrimaryButton>
                        </form>
                    </div>

                </div>
            </div>
        </GuestLayout>
    );
}
