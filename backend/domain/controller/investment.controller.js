const Investment = require('../domain/models/Investment');
const User = require('../domain/models/User');

// @desc    Create a new investment
// @route   POST /api/invest
exports.createInvestment = async (req, res) => {
    const { type, name, amount } = req.body;
    try {
        const user = await User.findById(req.user.id);

        if (user.balance < amount) {
            return res.status(400).json({ message: 'Insufficient balance' });
        }

        user.balance -= amount;
        await user.save();

        const investment = await Investment.create({
            user: req.user.id,
            type,
            name,
            amount,
        });

        res.status(201).json(investment);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get user's portfolio
// @route   GET /api/portfolio
exports.getPortfolio = async (req, res) => {
    try {
        const investments = await Investment.find({ user: req.user.id, status: 'approved' });
        const user = await User.findById(req.user.id).select('balance');
        
        // Aggregate portfolio data
        const portfolioSummary = investments.reduce((acc, investment) => {
            acc[investment.type] = (acc[investment.type] || 0) + investment.amount;
            return acc;
        }, {});

        res.json({
            balance: user.balance,
            investments,
            summary: portfolioSummary,
        });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};