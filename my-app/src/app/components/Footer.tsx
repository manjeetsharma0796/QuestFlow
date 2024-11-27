import { FC } from 'react';
import { FaGithub, FaDiscord, FaTwitter } from 'react-icons/fa';
import Link from 'next/link';

const Footer: FC = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 py-8">
            <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
                
                {/* Logo and Description */}
                <div className="text-center md:text-left mb-44">
                    <h1 className="text-xl font-bold text-white">Earn</h1>
                    <p className="mt-2 text-gray-400">
                        Discover high paying crypto bounties, projects, and grants from the best Solana companies in one place and apply to them using a single profile.
                    </p>
                </div>

                {/* Opportunities, Categories, About */}
                <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-16">
                    <div>
                        <h3 className="text-sm font-semibold text-gray-400 uppercase mb-2">Opportunities</h3>
                        <ul className="space-y-2">
                            <li><Link href="#" className="hover:text-white">Bounties</Link></li>
                            <li><Link href="#" className="hover:text-white">Projects</Link></li>
                            <li><Link href="#" className="hover:text-white">Grants</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-gray-400 uppercase mb-2">Categories</h3>
                        <ul className="space-y-2">
                            <li><Link href="#" className="hover:text-white">Content</Link></li>
                            <li><Link href="#" className="hover:text-white">Design</Link></li>
                            <li><Link href="#" className="hover:text-white">Development</Link></li>
                            <li><Link href="#" className="hover:text-white">Others</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-gray-400 uppercase mb-2">About</h3>
                        <ul className="space-y-2">
                            <li><Link href="#" className="hover:text-white">FAQ</Link></li>
                            <li><Link href="#" className="hover:text-white">Terms</Link></li>
                            <li><Link href="#" className="hover:text-white">Privacy Policy</Link></li>
                            <li><Link href="#" className="hover:text-white">Changelog</Link></li>
                            <li><Link href="#" className="hover:text-white">Contact Us</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Social Media Icons */}
                <div className="flex space-x-4">
                    <a href="#" aria-label="Github"><FaGithub className="text-gray-400 hover:text-white text-2xl" /></a>
                    <a href="#" aria-label="Twitter"><FaTwitter className="text-gray-400 hover:text-white text-2xl" /></a>
                    <a href="#" aria-label="Discord"><FaDiscord className="text-gray-400 hover:text-white text-2xl" /></a>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-700 mt-8 pt-4 text-center">
                <p className="text-sm text-gray-400">© 2024 Quest Flow. All rights reserved.</p>
                <div className="mt-2">
                    <span className="text-sm text-gray-400">Region:</span>
                    <button className="ml-2 text-gray-300 hover:text-white">Global</button>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
