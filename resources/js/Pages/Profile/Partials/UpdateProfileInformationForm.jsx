import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { Link, useForm, usePage } from '@inertiajs/react';
import { FiUser, FiMail, FiCheckCircle, FiSend } from 'react-icons/fi';

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = '',
}) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name,
            email: user.email,
        });

    const submit = (e) => {
        e.preventDefault();
        patch(route('profile.update'));
    };

    return (
        <section className={`bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 shadow-sm ${className}`}>
            <header className="flex items-start space-x-4">
                <div className="bg-indigo-500/10 p-3 rounded-lg">
                    <FiUser className="w-6 h-6 text-indigo-400" />
                </div>
                <div>
                    <h2 className="text-xl font-semibold text-white">
                        Profile Information
                    </h2>
                    <p className="mt-1 text-sm text-slate-300">
                        Update your account's profile information and email address.
                    </p>
                </div>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-5">
                <div className="space-y-2">
                    <InputLabel 
                        htmlFor="name" 
                        value="Name" 
                        className="text-sm font-medium text-slate-400"
                    />

                    <TextInput
                        id="name"
                        className="w-full bg-slate-800/50 border-slate-700/50 focus:border-indigo-500 focus:ring-indigo-500/50"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        isFocused
                        autoComplete="name"
                        placeholder="Your full name"
                    />

                    <InputError className="mt-1" message={errors.name} />
                </div>

                <div className="space-y-2">
                    <InputLabel 
                        htmlFor="email" 
                        value="Email" 
                        className="text-sm font-medium text-slate-400"
                    />

                    <TextInput
                        id="email"
                        type="email"
                        className="w-full bg-slate-800/50 border-slate-700/50 focus:border-indigo-500 focus:ring-indigo-500/50"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        autoComplete="username"
                        placeholder="your@email.com"
                    />

                    <InputError className="mt-1" message={errors.email} />
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div className="bg-yellow-500/10 p-4 rounded-lg border border-yellow-500/20">
                        <div className="flex items-start">
                            <FiMail className="w-5 h-5 text-yellow-400 mt-0.5 mr-3" />
                            <div>
                                <p className="text-sm text-yellow-100">
                                    Your email address is unverified.
                                </p>
                                <Link
                                    href={route('verification.send')}
                                    method="post"
                                    as="button"
                                    className="mt-2 inline-flex items-center text-sm text-yellow-300 hover:text-yellow-200 underline focus:outline-none"
                                >
                                    <FiSend className="mr-1.5" />
                                    Resend verification email
                                </Link>
                            </div>
                        </div>

                        {status === 'verification-link-sent' && (
                            <div className="mt-3 flex items-center text-sm font-medium text-green-400">
                                <FiCheckCircle className="mr-2" />
                                A new verification link has been sent to your email address.
                            </div>
                        )}
                    </div>
                )}

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
                                Saving...
                            </>
                        ) : (
                            'Save Changes'
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
                        className="flex items-center text-sm text-green-400"
                    >
                        <FiCheckCircle className="mr-2" />
                        Profile updated successfully
                    </Transition>
                </div>
            </form>
        </section>
    );
}