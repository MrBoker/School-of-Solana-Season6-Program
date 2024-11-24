use anchor_lang::prelude::*;

declare_id!("ZEezLrad25hbcLTM54uz6E3knHUmQnLjohixBUx2ZRc");

const SWITCH_STATE_SEED: &[u8] = b"switch-state"; // Seed for the PDA

#[error_code]
pub enum ErrorCode {
    #[msg("The PDA account does not match with the expected account")]
    InvalidPDA,
}

#[program]
pub mod switch_control_back {
    use super::*;

    // Initialize the PDA account with 0 as default value for the switches.
    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        // Compute the PDA and the bump
        let (switch_state_pda, _bump) = Pubkey::find_program_address(
            &[SWITCH_STATE_SEED],
            &ctx.program_id,
        );
    
        // Verify if the created account is the expected PDA
        if ctx.accounts.switch_state.key() != switch_state_pda {
            return Err(error!(ErrorCode::InvalidPDA));
        }
    
        let switch_state = &mut ctx.accounts.switch_state;
        switch_state.switches = 0; // All switches OFF
    
        Ok(())
    }

        pub fn update(ctx: Context<Update>, new_state: u8) -> Result<()> {
        // Compute the PDA and the bump
        let (switch_state_pda, _bump) = Pubkey::find_program_address(
            &[SWITCH_STATE_SEED],
            &ctx.program_id,
        );
    
        // Verify if the created account is the expected PDA
        if ctx.accounts.switch_state.key() != switch_state_pda {
            return Err(error!(ErrorCode::InvalidPDA));
        }
    
        // Update the switches state with a new value (0–255).
        let switch_state = &mut ctx.accounts.switch_state;
        switch_state.switches = new_state;
    
        Ok(())
    }

}

// Context for the 'initialize' instruction.
#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer = user, space = 8 + 1, seeds = [SWITCH_STATE_SEED], bump)]
    pub switch_state: Account<'info, SwitchState>,
    #[account(mut)]
    pub user: Signer<'info>, // User that pays the account creation
    pub system_program: Program<'info, System>, // We need the system program
}

// Context for the 'update' instruction.
#[derive(Accounts)]
pub struct Update<'info> {
    #[account(mut, seeds = [SWITCH_STATE_SEED], bump)]
    pub switch_state: Account<'info, SwitchState>,
}

// Struct of the account to store the 8 switches state.
#[account]
pub struct SwitchState {
    pub switches: u8, // Represents the state of the 8 switches
}
