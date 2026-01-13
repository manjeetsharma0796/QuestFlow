// Mantle Testnet (Sepolia) Configuration
export const MANTLE_TESTNET = {
    chainId: '0x138b', // 5003 in hex
    chainName: 'Mantle Testnet',
    nativeCurrency: {
        name: 'Mantle',
        symbol: 'MNT',
        decimals: 18,
    },
    rpcUrls: [
        'https://rpc.sepolia.mantle.xyz',
    ],
    blockExplorerUrls: ['https://explorer.sepolia.mantle.xyz'],
};

// Default network configuration
export const DEFAULT_NETWORK = MANTLE_TESTNET;

