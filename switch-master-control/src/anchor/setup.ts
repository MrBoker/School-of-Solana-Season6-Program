import { IdlAccounts, Program } from "@coral-xyz/anchor";
import { IDL, SwitchControlBack } from "./idl";
import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";

import { Buffer } from "buffer";

// Program ID for the switch-control-back program
const programId = new PublicKey("ZEezLrad25hbcLTM54uz6E3knHUmQnLjohixBUx2ZRc");

// Create a connection to the Solana Devnet
const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

// Initialize the program interface with the IDL, program ID, and connection.
// This setup allows us to interact with the on-chain program using the defined interface.
export const program = new Program<SwitchControlBack>(IDL, programId, {
  connection,
});

// Define the PDA for the SwitchState account
export const [switchStatePDA] = PublicKey.findProgramAddressSync(
  [Buffer.from("switch-state")], // Seed for PDA
  program.programId,
);

// TypeScript type for the SwitchState data structure based on the IDL
// This helps to ensure type safety when interacting with on-chain data.
export type SwitchStateData = IdlAccounts<SwitchControlBack>["switchState"];
