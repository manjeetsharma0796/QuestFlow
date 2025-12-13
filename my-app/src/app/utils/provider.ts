import { BrowserProvider, JsonRpcProvider, FallbackProvider } from 'ethers';
import { STORY_AENEID_TESTNET } from '../config/network';

/**
 * Creates a provider with fallback RPC endpoints for better reliability
 */
export const createProvider = () => {
  if (typeof window !== 'undefined' && window.ethereum) {
    // Use MetaMask's provider (BrowserProvider) which will use MetaMask's configured RPC
    return new BrowserProvider(window.ethereum);
  }
  
  // Fallback: Create a provider with multiple RPC endpoints
  const providers = STORY_AENEID_TESTNET.rpcUrls.map(
    (url) => new JsonRpcProvider(url)
  );
  
  return new FallbackProvider(providers, 1); // Use quorum of 1
};

/**
 * Handles RPC errors and provides user-friendly messages
 */
export const handleRpcError = (error: any): string => {
  // Check for RPC rate limiting or overload errors
  if (error?.code === -32002 || 
      error?.code === 'UNKNOWN_ERROR' || 
      error?.message?.includes('too many errors') ||
      error?.message?.includes('RPC endpoint returned too many errors')) {
    return 'The RPC endpoint is temporarily rate-limited or overloaded. Please wait 1-2 minutes and try again. If the issue persists, the network may be experiencing high traffic.';
  }
  
  if (error?.code === 4001) {
    return 'Transaction was rejected by user.';
  }
  
  if (error?.code === -32603) {
    return 'Internal RPC error. The network may be experiencing issues. Please try again in a few moments.';
  }
  
  if (error?.message?.includes('insufficient funds')) {
    return 'Insufficient funds for this transaction.';
  }
  
  if (error?.message?.includes('nonce')) {
    return 'Transaction nonce error. Please try again.';
  }
  
  if (error?.message?.includes('network') || error?.message?.includes('connection')) {
    return 'Network connection error. Please check your internet connection and try again.';
  }
  
  return error?.message || 'An unexpected error occurred. Please try again.';
};

