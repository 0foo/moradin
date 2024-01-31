export const Random = {
    dice_roll: function(num_dice, size_dice, bonus = 0, drop_lowest = false) {
        // Ensure valid input values
        if (num_dice <= 0 || size_dice <= 0) {
            throw new Error("Number of dice and size of dice must be greater than 0.");
        }

        // Roll the specified number of dice
        const rolls = [];
        for (let i = 0; i < num_dice; i++) {
            const roll = Math.floor(Math.random() * size_dice) + 1;
            rolls.push(roll);
        }

        let dropped = false
        // Optionally drop the lowest roll
        if (drop_lowest && num_dice > 1) {
            const minRoll = Math.min(...rolls);
            const minIndex = rolls.indexOf(minRoll);
            dropped = minRoll
            rolls.splice(minIndex, 1);
        }

        // Calculate the total by summing up the rolls and adding the bonus
        const total = rolls.reduce((acc, roll) => acc + roll, 0) + bonus;
        

        const out = {
            dropped: dropped,
            rolls: rolls,
            total: total
        };

        console.log(out)
        return out
    }
};