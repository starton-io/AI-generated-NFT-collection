import { Network } from "./Network";
export interface DeployBody {
	pictures: string[] | []
	ownerWallet: string | null,
	smartContractName: string | null,
	smartContractSymbol: string | null,
	network: string | null
}
