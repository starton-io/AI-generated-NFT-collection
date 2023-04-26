export enum Network {
	ETHEREUM_MAINNET = 'ethereum-mainnet',
	ETHEREUM_GOERLI = 'ethereum-goerli',

	BINANCE_MAINNET = 'binance-mainnet',
	BINANCE_TESTNET = 'binance-testnet',

	POLYGON_MAINNET = 'polygon-mainnet',
	POLYGON_MUMBAI = 'polygon-mumbai',

	AVALANCHE_MAINNET = 'avalanche-mainnet',
	AVALANCHE_FUJI = 'avalanche-fuji',
}

export const testnetNetwork: Array<string> = [
	Network.ETHEREUM_GOERLI,
	Network.BINANCE_TESTNET,
	Network.POLYGON_MUMBAI,
	Network.AVALANCHE_FUJI,
]
export const explorerNetwork: Record<Network, string> = Object.freeze({
	[Network.ETHEREUM_MAINNET]: 'ethereum',
	[Network.ETHEREUM_GOERLI]: 'goerli',
	[Network.BINANCE_MAINNET]: 'bsc',
	[Network.BINANCE_TESTNET]: 'bsc-testnet',
	[Network.AVALANCHE_MAINNET]: 'avalanche',
	[Network.AVALANCHE_FUJI]: 'avalanche-fuji',
	[Network.POLYGON_MAINNET]: 'matic',
	[Network.POLYGON_MUMBAI]: 'mumbai',
})

export const networkUrl: Record<string, string>[] = [
	{
		children: 'Ethereum - Mainnet',
		value: Network.ETHEREUM_MAINNET,
	},
	{
		children: 'Ethereum - Goerli',
		value: Network.ETHEREUM_GOERLI,
	},
	{
		children: 'BNB Chain - Mainnet',
		value: Network.BINANCE_MAINNET,
	},
	{
		children: 'BNB Chain - Testnet',
		value: Network.BINANCE_TESTNET,
	},
	{
		children: 'Polygon - Mainnet',
		value: Network.POLYGON_MAINNET,
	},
	{
		children: 'Polygon - Mumbai',
		value: Network.POLYGON_MUMBAI,
	},
	{
		children: 'Avalanche - Mainnet',
		value: Network.AVALANCHE_MAINNET,
	},
	{
		children: 'Avalanche - Fuji',
		value: Network.AVALANCHE_FUJI,
	},
]
