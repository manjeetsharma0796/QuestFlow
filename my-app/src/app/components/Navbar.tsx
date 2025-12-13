'use client';

import { useState, useEffect, useRef, useCallback } from "react";
import { FaUserCircle } from "react-icons/fa"; // Profile icon
import { useRouter } from 'next/navigation'; // Import useRouter from Next.js
import Link from 'next/link'; // Use Link to navigate
import questAbi from '../contractData/Quest.json'
import { BrowserProvider, ethers } from "ethers";
import questAddress from "../contractData/address.json";
import LoginButton from '@/app/components/LoginButton';
import { useOCAuth } from '@opencampus/ocid-connect-js';
import { DEFAULT_NETWORK } from '../config/network';
import { toast } from 'sonner';
import { handleRpcError } from '../utils/provider';

declare global {
  interface Window {
    ethereum?: any; // Declare the ethereum object
  }
}


const Navbar: React.FC = () => {

  const { authState, ocAuth } = useOCAuth() as {
    authState: { isLoading: boolean; isAuthenticated: boolean; error?: { message: string } };
    ocAuth: { getAuthState: () => { OCId: string } };
  };

 

  if (!authState) {
    return <div>Loading authentication...</div>;
  }

  if (authState.error) {
    return <div>Error: {authState.error.message}</div>;
  }

  if (authState.isLoading) {
    return <div>Loading...</div>;
  }

  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [account, setAccount] = useState<string>("reset");
  const [balance, setBalance] = useState<string>('0 QST'); // Set initial balance to '0 MQ'
  const [showPopdown, setShowPopdown] = useState<boolean>(false); // State to handle pop-down visibility
  const router = useRouter(); // Initialize the router
  const logoRef = useRef<HTMLDivElement>(null); // Ref for logo animation
  const [quest, setQuest] = useState<ethers.Contract | undefined>(undefined);

  const switchToStoryAeneid = useCallback(async () => {
    if (!window.ethereum) return;

    try {
      const chainId = await window.ethereum.request({ method: 'eth_chainId' });
      const targetChainId = DEFAULT_NETWORK.chainId;

      if (chainId !== targetChainId) {
        try {
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: targetChainId }],
          });
        } catch (switchError: any) {
          // This error code indicates that the chain has not been added to MetaMask
          if (switchError.code === 4902) {
            try {
              // Use the first RPC URL (most reliable) when adding network
              const networkToAdd = {
                ...DEFAULT_NETWORK,
                rpcUrls: [DEFAULT_NETWORK.rpcUrls[0]], // Use first RPC URL for initial add
              };
              
              await window.ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [networkToAdd],
              });
              
              toast.success('Network added!', {
                description: 'Story Aeneid Testnet has been added to your wallet.',
              });
            } catch (addError: any) {
              console.error('Failed to add Story Aeneid testnet:', addError);
              toast.error('Failed to add network', {
                description: 'Please add Story Aeneid Testnet manually in MetaMask settings.',
              });
            }
          } else {
            console.error('Failed to switch to Story Aeneid testnet:', switchError);
            toast.warning('Network switch failed', {
              description: 'Please switch to Story Aeneid Testnet manually.',
            });
          }
        }
      }
    } catch (error) {
      console.error('Error checking/switching network:', error);
    }
  }, []);

  const checkWalletConnection = useCallback(async () => {
    if (!window.ethereum) {
      // If MetaMask is not available, clear localStorage
      setIsConnected(false);
      setAccount('reset');
      setBalance('0 QST');
      return;
    }

    try {
      const accounts = await window.ethereum.request({ method: 'eth_accounts' });
      if (accounts.length > 0) {
        setIsConnected(true);
        setAccount(accounts[0]);
        // Optionally fetch balance here
      } else {
        // MetaMask is available but no accounts are connected
        setIsConnected(false);
        setAccount('reset');
        setBalance('0 QST');
      }
    } catch (error) {
      console.error('Error checking wallet connection:', error);
      setIsConnected(false);
      setAccount('reset');
      setBalance('0 QST');
    }
  }, []);

  const handleAccountsChanged = useCallback((accounts: string[]) => {
    if (accounts.length === 0) {
      // User disconnected their wallet
      setIsConnected(false);
      setAccount('reset');
      setBalance('0 QST');
    } else {
      // User switched accounts
      setAccount(accounts[0]);
    }
  }, []);

  const handleChainChanged = useCallback(() => {
    // Reload the page when chain changes to ensure everything is in sync
    window.location.reload();
  }, []);

  // Load wallet connection state from localStorage on mount (for immediate UI update)
  useEffect(() => {
    const savedAccount = localStorage.getItem('walletAccount');
    const savedBalance = localStorage.getItem('walletBalance');
    const savedIsConnected = localStorage.getItem('walletConnected') === 'true';

    if (savedIsConnected && savedAccount) {
      setIsConnected(true);
      setAccount(savedAccount);
      if (savedBalance) {
        setBalance(savedBalance);
      }
    }
  }, []);

  // Initialize wallet connection and verify with MetaMask
  useEffect(() => {
    const initializeWallet = async () => {
      if (typeof window.ethereum !== 'undefined') {
        console.log('MetaMask is installed!');
        
        // Switch to Story Aeneid testnet on component mount
        await switchToStoryAeneid();

        // Verify wallet connection with MetaMask (this will update state if different)
        await checkWalletConnection();

        // Listen for account changes
        window.ethereum.on('accountsChanged', handleAccountsChanged);
        
        // Listen for chain changes
        window.ethereum.on('chainChanged', handleChainChanged);

        // Cleanup listeners on unmount
        return () => {
          if (window.ethereum) {
            window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
            window.ethereum.removeListener('chainChanged', handleChainChanged);
          }
        };
      } else {
        console.error('MetaMask is not detected');
      }
    };

    initializeWallet();
  }, [switchToStoryAeneid, checkWalletConnection, handleAccountsChanged, handleChainChanged]);

  // Save wallet state to localStorage whenever it changes
  useEffect(() => {
    if (isConnected && account && account !== 'reset') {
      localStorage.setItem('walletConnected', 'true');
      localStorage.setItem('walletAccount', account);
      localStorage.setItem('walletBalance', balance);
    } else {
      localStorage.removeItem('walletConnected');
      localStorage.removeItem('walletAccount');
      localStorage.removeItem('walletBalance');
    }
  }, [isConnected, account, balance]);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        // Switch to Story Aeneid testnet before connecting
        await switchToStoryAeneid();
        
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        if (accounts.length > 0) {
          setIsConnected(true);
          setAccount(accounts[0]); // Store the first account address
          // Set a sample balance (You can replace this with actual balance fetching logic)
          setBalance('10 QST');
          // State will be saved to localStorage automatically via useEffect

          toast.success('Wallet connected!', {
            description: `Connected to ${accounts[0].substring(0, 6)}...${accounts[0].substring(accounts[0].length - 4)}`,
          });

          // Redirect to home page after successful connection
          router.push('/home'); // Automatically redirect to the home page
        }
      } catch (error: any) {
        console.error("User denied wallet connection or another error occurred:", error);
        if (error?.code === 4001) {
          toast.warning('Connection cancelled', {
            description: 'Please connect your wallet to continue.',
          });
        } else {
          toast.error('Connection failed', {
            description: error?.message || 'An error occurred while connecting your wallet.',
          });
        }
      }
    } else {
      toast.error("MetaMask is not installed", {
        description: "Please install MetaMask and try again.",
      });
    }
  };

  const disconnectWallet = () => {
    setIsConnected(false);
    setAccount('reset');
    setBalance('0 QST');
    // localStorage will be cleared automatically via useEffect
    toast.info('Wallet disconnected', {
      description: 'You have been disconnected from your wallet.',
    });
  };

  const handleWithdraw = async () => {
    // Withdraw logic here (You can call your contract function or any other logic)

    const toastId = toast.loading('Processing transaction...', {
      description: 'Please wait while we process your withdrawal.',
    });

    try {
      if (!window.ethereum) {
        throw new Error('MetaMask is not available');
      }

      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner()
      const questContract = new ethers.Contract(questAddress.contractAddress, questAbi.abi, signer)
      setQuest(questContract);
      // mint();
      // console.log(balance, "========inside withdraw===")

      // Add timeout for transaction
      const txPromise = questContract.mint(account, ethers.parseUnits(parseInt(balance).toString(), 18));
      const tx = await txPromise;
      
      toast.loading('Waiting for confirmation...', {
        description: 'Transaction submitted. Waiting for blockchain confirmation.',
        id: toastId,
      });

      await tx.wait();
      
      toast.success('Withdrawal successful!', {
        description: 'Your earned QST coins have been withdrawn.',
        id: toastId,
      });
    } catch (error: any) {
      const errorMessage = handleRpcError(error);
      
      // Check if it's an RPC error that might be temporary
      if (error?.code === -32002 || error?.code === 'UNKNOWN_ERROR') {
        toast.error('Network Error', {
          description: errorMessage + ' You may need to wait a moment and try again.',
          id: toastId,
          duration: 6000,
        });
      } else {
        toast.error('Transaction failed', {
          description: errorMessage,
          id: toastId,
        });
      }
      console.error('Withdrawal error:', error);
    }
  };

  // const mint = async () => {
  //   if (!quest) {
  //     console.error('Quest contract is not initialized');
  //     return;
  //   }

  //   console.log('Connected account:', account);
  //   console.log('Connected balance:', balance);

  //   console.log("================", account, balance, "=======inside minting============");
  //   await (await quest.mint(account, ethers.parseUnits(parseInt("5").toString(), 18))).wait();

  //   return;
  // }

  const togglePopdown = () => {
    setShowPopdown(prev => !prev); // Toggle pop-down visibility
  };

  return (
    <nav className="absolute top-0 left-0 right-0 flex justify-between items-center p-6 bg-transparent z-50">
      <div
        ref={logoRef}
        className="flex items-center font-bold text-3xl text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500"
      >
        <Link href="/home">Quest Flow</Link>
      </div>

      <div className="flex items-center space-x-4 relative">
        {/* Balance with clickable popdown */}
        <div
          className="text-white font-semibold relative cursor-pointer"
          onClick={togglePopdown} // Toggle on click
        >
          Balance: {balance}

          {/* Pop-down content */}
          {showPopdown && (
            <div className="text-sm absolute top-full mt-2 w-40 bg-white text-black p-4 rounded-lg shadow-lg z-10 right-[1px]">
              <p className="font-semibold">Balance Details</p>
              <p>Total Balance: {balance}</p>
              {/* <p>Pending Transactions: 2</p> */}

              {/* Withdraw Button */}
              <button
                onClick={handleWithdraw}
                className="mt-2 w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-400 transition duration-300"
              >
                Withdraw
              </button>

              {/* Optional Close Button */}
              <button
                onClick={() => setShowPopdown(false)}
                className="mt-2 w-full bg-gray-300 text-black py-2 px-4 rounded-lg hover:bg-gray-400 transition duration-300"
              >
                Close
              </button>
            </div>
          )}
        </div>

        <Link href={`/profile?account=${account}&balance=${balance}`}>
          <button
            className="text-white bg-blue-500 hover:bg-blue-400 transition duration-300 px-4 py-2 rounded-lg flex items-center space-x-2 transform hover:scale-105"
          >
            <FaUserCircle className="text-2xl" />
            <span>Profile</span>
          </button>
        </Link>
        {/* <button
          className="text-white bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-400 hover:to-purple-600 transition duration-300 px-4 py-2 rounded-lg transform hover:scale-105"
        >
        {authState.isAuthenticated ? (
          <p className="text-white">{JSON.stringify(ocAuth.getAuthState().OCId)} 🎉</p>
        ) : (
          <LoginButton />
        )}
        </button> */}
        <button
          onClick={isConnected ? disconnectWallet : connectWallet}
          className="text-white bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-400 hover:to-purple-600 transition duration-300 px-4 py-2 rounded-lg transform hover:scale-105"
        >
          {isConnected ? `${account?.substring(0, 6)}...${account?.substring(account.length - 4)}` : "Connect Wallet"}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
