import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { useForm } from '@inertiajs/react';
import { useRef } from 'react';
import { FiLock, FiCheckCircle } from 'react-icons/fi';

export default function UpdatePasswordForm({ className = '' }) {
    const passwordInput = useRef();
    const currentPasswordInput = useRef();

    const {
        data,
        setData,
        errors,
        put,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const updatePassword = (e) => {
        e.preventDefault();

        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current.focus();
                }

                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current.focus();
                }
            },
        });
    };

    return (
        <section className={`bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 shadow-sm ${className}`}>
            <header className="flex items-start space-x-4">
                <div className="bg-cyan-500/10 p-3 rounded-lg">
                    <FiLock className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                    <h2 className="text-xl font-semibold text-white">
                        Update Password
                    </h2>
                    <p className="mt-1 text-sm text-slate-300">
                        Ensure your account is using a long, random password to stay secure.
                    </p>
                </div>
            </header>

            <form onSubmit={updatePassword} className="mt-6 space-y-5">
                <div className="space-y-2">
                    <InputLabel
                        htmlFor="current_password"
                        value="Current Password"
                        className="text-sm font-medium text-slate-400"
                    />

                    <TextInput
                        id="current_password"
                        ref={currentPasswordInput}
                        value={data.current_password}
                        onChange={(e) => setData('current_password', e.target.value)}
                        type="password"
                        className="w-full bg-slate-800/50 border-slate-700/50 focus:border-cyan-500 focus:ring-cyan-500/50"
                        autoComplete="current-password"
                        placeholder="Enter current password"
                    />

                    <InputError
                        message={errors.current_password}
                        className="mt-1"
                    />
                </div>

                <div className="space-y-2">
                    <InputLabel 
                        htmlFor="password" 
                        value="New Password" 
                        className="text-sm font-medium text-slate-400"
                    />

                    <TextInput
                        id="password"
                        ref={passwordInput}
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        type="password"
                        className="w-full bg-slate-800/50 border-slate-700/50 focus:border-cyan-500 focus:ring-cyan-500/50"
                        autoComplete="new-password"
                        placeholder="Enter new password"
                    />

                    <InputError message={errors.password} className="mt-1" />
                </div>

                <div className="space-y-2">
                    <InputLabel
                        htmlFor="password_confirmation"
                        value="Confirm Password"
                        className="text-sm font-medium text-slate-400"
                    />

                    <TextInput
                        id="password_confirmation"
                        value={data.password_confirmation}
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        type="password"
                        className="w-full bg-slate-800/50 border-slate-700/50 focus:border-cyan-500 focus:ring-cyan-500/50"
                        autoComplete="new-password"
                        placeholder="Confirm new password"
                    />

                    <InputError
                        message={errors.password_confirmation}
                        className="mt-1"
                    />
                </div>

                <div className="flex items-center gap-4 pt-2">
                    <PrimaryButton 
                        disabled={processing}
                        className="flex items-center justify-center px-6 py-2.5"
                    >
                        {processing ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Updating...
                            </>
                        ) : (
                            'Update Password'
                        )}
                    </PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out duration-200"
                        enterFrom="opacity-0 translate-x-2"
                        enterTo="opacity-100 translate-x-0"
                        leave="transition ease-in-out duration-200"
                        leaveFrom="opacity-100 translate-x-0"
                        leaveTo="opacity-0 translate-x-2"
                        className="flex items-center text-sm text-cyan-400"
                    >
                        <FiCheckCircle className="mr-2" />
                        Password updated successfully
                    </Transition>
                </div>
            </form>
        </section>
    );
}