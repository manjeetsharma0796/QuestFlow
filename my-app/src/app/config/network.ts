// Story Aeneid Testnet Configuration
export const STORY_AENEID_TESTNET = {
    chainId: '0x523', // 1315 in hex
    chainName: 'Story Aeneid Testnet',
    nativeCurrency: {
        name: 'ETH',
        symbol: 'ETH',
        decimals: 18,
    },
    // Primary RPC endpoint - if this is rate-limited, users may need to wait or use a custom RPC
    // Note: Ankr RPC can be rate-limited. If experiencing errors, try:
    // 1. Wait a few minutes and retry
    // 2. Use a custom RPC endpoint in MetaMask network settings
    // 3. Check Story documentation for alternative RPC endpoints
    rpcUrls: [
        'https://rpc.ankr.com/story_aeneid_testnet',
    ],
    blockExplorerUrls: ['https://explorer.aeneid.story.xyz'],
};

// Default network configuration
export const DEFAULT_NETWORK = STORY_AENEID_TESTNET;

