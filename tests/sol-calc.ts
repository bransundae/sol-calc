import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { SolCalc } from "../target/types/sol_calc";
import { LAMPORTS_PER_SOL, SystemProgram } from "@solana/web3.js";
import {expect} from "chai";

describe("sol-calc", () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.SolCalc as Program<SolCalc>;

  const user = anchor.web3.Keypair.generate()

  before(async () => {
    await provider.connection.confirmTransaction(
        await provider.connection.requestAirdrop(
            user.publicKey,
            2 * LAMPORTS_PER_SOL,
        ),
        "confirmed"
    );
  });

  it("can do addition", async () => {
    const tx = await program
        .methods
        .calculate("1 + 10")
        .accounts({
          payer: user.publicKey,
          systemProgram: SystemProgram.programId
        })
        .signers([user])
        .rpc();

    await new Promise(resolve => setTimeout(resolve, 5000));

    const transaction = await provider.connection.getTransaction(tx, {
      commitment: 'confirmed'
    });

    const logMessages = transaction.meta.logMessages;

    expect(logMessages[2]).to.equal('Program log: 1 + 10 = 11');
  });

  it("can do subtraction", async () => {
    const tx = await program
        .methods
        .calculate("1 - 10")
        .accounts({
          payer: user.publicKey,
          systemProgram: SystemProgram.programId
        })
        .signers([user])
        .rpc();

    await new Promise(resolve => setTimeout(resolve, 5000));

    const transaction = await provider.connection.getTransaction(tx, {
      commitment: 'confirmed'
    });

    const logMessages = transaction.meta.logMessages;

    expect(logMessages[2]).to.equal('Program log: 1 - 10 = -9');
  });

  it("can do multiplication", async () => {
    const tx = await program
        .methods
        .calculate("1 * 10")
        .accounts({
          payer: user.publicKey,
          systemProgram: SystemProgram.programId
        })
        .signers([user])
        .rpc();

    await new Promise(resolve => setTimeout(resolve, 5000));

    const transaction = await provider.connection.getTransaction(tx, {
      commitment: 'confirmed'
    });

    const logMessages = transaction.meta.logMessages;

    expect(logMessages[2]).to.equal('Program log: 1 * 10 = 10');
  });

  it("can do division", async () => {
    const tx = await program
        .methods
        .calculate("1 / 10")
        .accounts({
          payer: user.publicKey,
          systemProgram: SystemProgram.programId
        })
        .signers([user])
        .rpc();

    await new Promise(resolve => setTimeout(resolve, 5000));

    const transaction = await provider.connection.getTransaction(tx, {
      commitment: 'confirmed'
    });

    const logMessages = transaction.meta.logMessages;

    expect(logMessages[2]).to.equal('Program log: 1 / 10 = 0.1');
  });
});
