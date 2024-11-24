import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { SwitchControlBack } from "../target/types/switch_control_back";
import { assert } from "chai";

describe("switch-control-back", () => {
  // Configure Anchor environment
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.SwitchControlBack as Program<SwitchControlBack>;

  // PDA with the switches states
  const [switchStatePda, bump] = anchor.web3.PublicKey.findProgramAddressSync(
    [Buffer.from("switch-state")],
    program.programId
  );

  /*it("Initializes the switch state", async () => {
    // Create the transaction for initialize
    await program.methods
      .initialize()
      .accounts({
        switchState: switchStatePda,
        user: provider.wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .rpc();

    // Load the initialized account to check if the value is ok
    const switchState = await program.account.switchState.fetch(switchStatePda);

    // Validate that the initial value is o
    assert.strictEqual(switchState.switches, 0, "Switch state should initialize to 0");
  });*/

  // Second version of the Initialize test case.
  // Since the access to a PDA is deterministic, once it is initialized, a second tests pass will fail here
  // I'll improve this test case checking if the PDA have been already initialized
  it("Initializes (IF not exists) the switch state", async () => {
    let switchState;
    try {
      // Try to fetch the PDA account
      switchState = await program.account.switchState.fetch(switchStatePda);
      // If the account exists, we check that its initial value is 0
      assert.strictEqual(switchState.switches, 0, "Switch state should already be initialized to 0");
    } catch (err) {
      // If account doesn't exist, initialize it
      if (err.message && err.message.includes('Account does not exist')) {
        // The "Account does not exist" error should trigger the initialization
        await program.methods
          .initialize()
          .accounts({
            switchState: switchStatePda,
            user: provider.wallet.publicKey,
            systemProgram: anchor.web3.SystemProgram.programId,
          })
          .rpc();
  
        // Now fetch the initialized account and verify that the value is 0
        switchState = await program.account.switchState.fetch(switchStatePda);
        assert.strictEqual(switchState.switches, 0, "Switch state should initialize to 0");
      } else {
        // If the error is not about the account not being found, rethrow it
        throw err;
      }
    }
  });

  it("Fails with an incorrect seed", async () => {
    // Compute a PDA using an incorrect seed
    const [invalidSwitchStatePda, _] = anchor.web3.PublicKey.findProgramAddressSync(
      [Buffer.from("wrong-seed")], // Incorrect seed
      program.programId
    );
  
    try {
      // Try to update the state in the PDA with an incorrect seed
      await program.methods
        .update(100)
        .accounts({
          switchState: invalidSwitchStatePda,
        })
        .rpc();
      assert.fail("Expected transaction to fail due to incorrect seed");
    } catch (err) {
      // Verify that the error indicate that the account does not exist or is invalid
      assert.include(
        err.toString(),
        "Account does not exist",
        "Error should indicate missing or invalid account"
      );
    }
  }); 

  it("Updates the switch state", async () => {
    const newState = 55; // Test value

    // Create the transaction for update the state
    await program.methods
      .update(newState)
      .accounts({
        switchState: switchStatePda,
      })
      .rpc();

    // Load the updated account to check if the value is ok
    const switchState = await program.account.switchState.fetch(switchStatePda);

    // Validate that the updated state is the expected
    assert.strictEqual(switchState.switches, newState, `Switch state should update to ${newState}`);
  });

  it("Rejects invalid PDA access", async () => {
    const invalidPda = anchor.web3.Keypair.generate().publicKey; // Generate an incorrect PDA

    try {
      await program.methods
        .update(10)
        .accounts({
          switchState: invalidPda,
        })
        .rpc();
      assert.fail("Expected transaction to fail with invalid PDA");
    } catch (err) {
      assert.include(err.toString(), "Account does not exist", "Error should indicate missing account");
    }
  });

});