const commissionRate = 0.3; // 30% commission rate

// Define the payout frequency (e.g., monthly)
const payoutFrequency = "monthly";

// Define any additional program rules or incentives
const programRules = {
  minimumPayoutThreshold: 100, // Minimum balance required for a payout
  referralExpiration: 30, // Number of days after which a referral link expires
  // Add more rules as needed
};

// Example of accessing the defined program structure:
console.log("Commission Rate:", commissionRate);
console.log("Payout Frequency:", payoutFrequency);
console.log("Minimum Payout Threshold:", programRules.minimumPayoutThreshold);
console.log("Referral Expiration (in days):", programRules.referralExpiration);
