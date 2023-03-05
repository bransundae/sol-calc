mod calc;

use anchor_lang::prelude::*;
use crate::calc::{add, sub};
use solana_program::{system_program};

declare_id!("2hcHkZohEc5BwoXUs3ohSBWYr6CxnyfdrNBGigjzsGn7");

#[program]
pub mod sol_calc {
    use crate::calc::{div, mul};
    use super::*;

    pub fn calculate(ctx: Context<Calculate>, input: String) -> Result<()> {
        let mut input_iterator = input.split_whitespace();
        let num1: f64 = input_iterator.next().unwrap_or_default().parse().unwrap();
        let operator = input_iterator.next().unwrap();
        let num2: f64 = input_iterator.next().unwrap().parse().unwrap();

        // use immutable refs to perform calculations without transferring ownership
        let result = match operator {
            "+" => Some(add(&num1, &num2)),
            "-" => Some(sub(&num1, &num2)),
            "*" => Some(mul(&num1 , &num2)),
            "/" => Some(div(&num1, &num2)),
            _ => None,
        };

        require!(result.is_some(), ValidationError::ParseError);

        msg!(
            "{} = {}",
            input,
            result.unwrap()
        );

        Ok(())
    }
}

#[derive(Accounts)]
pub struct Calculate<'info> {
    #[account(mut)]
    pub payer: Signer<'info>,

    #[account(address=system_program::ID)]
    pub system_program: Program<'info, System>,
}

#[error_code]
pub enum ValidationError {
    #[msg("Failed to parse input")]
    ParseError,
}
