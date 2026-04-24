// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title PortfolioAdvisor
 * @dev A smart contract for storing and managing cryptocurrency portfolio strategies
 * @notice This contract logs portfolio snapshots and rebalancing actions
 */

contract PortfolioAdvisor {
    
    // ============== STRUCTURES ==============
    
    /**
     * @dev Portfolio structure to store user's portfolio data
     */
    struct Portfolio {
        string portfolioData; // JSON string with token allocations
        string riskProfile;   // "Low", "Medium", "High"
        uint256 timestamp;    // When the portfolio was recorded
        uint256 totalValue;   // Total portfolio value in USD
    }

    /**
     * @dev Rebalance action structure
     */
    struct RebalanceAction {
        address user;
        string actionData;    // JSON string with rebalance details
        string aiSuggestion;  // AI recommendation
        uint256 timestamp;
        bool executed;
    }

    // ============== STATE VARIABLES ==============
    
    mapping(address => Portfolio) public portfolios;
    mapping(address => RebalanceAction[]) public rebalanceHistory;
    mapping(address => string) public userRiskProfiles;
    
    address[] public users;
    bool public initialized;

    // ============== EVENTS ==============
    
    event PortfolioStored(
        address indexed user,
        string portfolioData,
        uint256 totalValue,
        uint256 timestamp
    );
    
    event RiskProfileSet(
        address indexed user,
        string riskProfile,
        uint256 timestamp
    );
    
    event RebalanceExecuted(
        address indexed user,
        string actionData,
        string aiSuggestion,
        uint256 timestamp
    );

    // ============== MODIFIERS ==============
    
    /**
     * @dev Ensures that a user address is valid (not zero address)
     */
    modifier validAddress(address _user) {
        require(_user != address(0), "Invalid address");
        _;
    }

    /**
     * @dev Ensures that input string is not empty
     */
    modifier nonEmptyString(string memory _data) {
        require(bytes(_data).length > 0, "String cannot be empty");
        _;
    }

    // ============== CONSTRUCTOR ==============
    
    constructor() {
        initialized = true;
    }

    // ============== CORE FUNCTIONS ==============
    
    /**
     * @dev Store or update user's portfolio data
     * @param user User's wallet address
     * @param portfolioData JSON string containing portfolio allocation
     * @param totalValue Total portfolio value in USD
     */
    function storePortfolio(
        address user,
        string calldata portfolioData,
        uint256 totalValue
    ) external validAddress(user) nonEmptyString(portfolioData) {
        require(totalValue > 0, "Portfolio value must be greater than 0");
        
        Portfolio storage portfolio = portfolios[user];
        
        // Track first-time users
        if (bytes(portfolio.portfolioData).length == 0) {
            users.push(user);
        }
        
        portfolios[user] = Portfolio({
            portfolioData: portfolioData,
            riskProfile: portfolio.riskProfile,
            timestamp: block.timestamp,
            totalValue: totalValue
        });
        
        emit PortfolioStored(user, portfolioData, totalValue, block.timestamp);
    }

    /**
     * @dev Set user's risk profile
     * @param user User's wallet address
     * @param riskLevel "Low", "Medium", or "High"
     */
    function setRiskProfile(
        address user,
        string calldata riskLevel
    ) external validAddress(user) nonEmptyString(riskLevel) {
        require(
            keccak256(abi.encodePacked(riskLevel)) == keccak256(abi.encodePacked("Low")) ||
            keccak256(abi.encodePacked(riskLevel)) == keccak256(abi.encodePacked("Medium")) ||
            keccak256(abi.encodePacked(riskLevel)) == keccak256(abi.encodePacked("High")),
            "Invalid risk level"
        );
        
        portfolios[user].riskProfile = riskLevel;
        userRiskProfiles[user] = riskLevel;
        
        emit RiskProfileSet(user, riskLevel, block.timestamp);
    }

    /**
     * @dev Execute a rebalance action (logs the action on-chain)
     * @param user User's wallet address
     * @param actionData JSON string with rebalance details
     * @param aiSuggestion AI recommendation that was applied
     */
    function rebalance(
        address user,
        string calldata actionData,
        string calldata aiSuggestion
    ) external validAddress(user) nonEmptyString(actionData) nonEmptyString(aiSuggestion) {
        
        RebalanceAction memory action = RebalanceAction({
            user: user,
            actionData: actionData,
            aiSuggestion: aiSuggestion,
            timestamp: block.timestamp,
            executed: true
        });
        
        rebalanceHistory[user].push(action);
        
        emit RebalanceExecuted(user, actionData, aiSuggestion, block.timestamp);
    }

    // ============== VIEW FUNCTIONS ==============
    
    /**
     * @dev Get user's current portfolio
     * @param user User's wallet address
     * @return Portfolio data
     */
    function getUserPortfolio(address user) 
        external 
        view 
        validAddress(user) 
        returns (Portfolio memory) 
    {
        return portfolios[user];
    }

    /**
     * @dev Get user's risk profile
     * @param user User's wallet address
     * @return Risk profile level
     */
    function getRiskProfile(address user) 
        external 
        view 
        validAddress(user) 
        returns (string memory) 
    {
        return portfolios[user].riskProfile;
    }

    /**
     * @dev Get user's rebalance history
     * @param user User's wallet address
     * @return Array of rebalance actions
     */
    function getRebalanceHistory(address user) 
        external 
        view 
        validAddress(user) 
        returns (RebalanceAction[] memory) 
    {
        return rebalanceHistory[user];
    }

    /**
     * @dev Get total number of rebalance actions for a user
     * @param user User's wallet address
     * @return Count of rebalance actions
     */
    function getRebalanceCount(address user) 
        external 
        view 
        validAddress(user) 
        returns (uint256) 
    {
        return rebalanceHistory[user].length;
    }

    /**
     * @dev Get total number of active users
     * @return User count
     */
    function getUserCount() external view returns (uint256) {
        return users.length;
    }

    /**
     * @dev Get user address by index
     * @param index Index in the users array
     * @return User address
     */
    function getUserByIndex(uint256 index) 
        external 
        view 
        returns (address) 
    {
        require(index < users.length, "Index out of bounds");
        return users[index];
    }

    /**
     * @dev Check if a portfolio exists for a user
     * @param user User's wallet address
     * @return Boolean indicating if portfolio exists
     */
    function portfolioExists(address user) 
        external 
        view 
        validAddress(user) 
        returns (bool) 
    {
        return bytes(portfolios[user].portfolioData).length > 0;
    }
}
