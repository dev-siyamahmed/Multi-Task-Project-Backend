

const { User } = require("../models");

// Decrease user storage (when uploading files)
async function decreaseStorage(userId, size) {
  const user = await User.findById(userId);

  if (!user) {
    throw new Error("User not found!");
  }

  // Initialize fields if they don't exist (for old users)
  if (user.totalStorage === undefined) {
    user.totalStorage = 15360; // 15 GB default
  }
  if (user.usedStorage === undefined) {
    user.usedStorage = 0;
  }
  if (user.storageSize === undefined) {
    user.storageSize = user.totalStorage;
  }

  // Check if user has enough available storage
  if (user.storageSize < size) {
    throw new Error(
      `Not enough storage! Available: ${user.storageSize.toFixed(2)} MB, Required: ${size.toFixed(2)} MB`
    );
  }

  // Decrease available storage
  user.storageSize -= size;
  
  // Increase used storage
  user.usedStorage += size;

  await user.save();

  console.log(` Storage updated for user ${userId}:`);
  console.log(`   - File size: ${size.toFixed(2)} MB`);
  console.log(`   - Used storage: ${user.usedStorage.toFixed(2)} MB`);
  console.log(`   - Available storage: ${user.storageSize.toFixed(2)} MB`);
  console.log(`   - Usage: ${((user.usedStorage / user.totalStorage) * 100).toFixed(2)}%`);

  return {
    usedStorage: user.usedStorage,
    storageSize: user.storageSize,
    totalStorage: user.totalStorage,
  };
}

// Increase user storage (when deleting files)
async function increaseStorage(userId, size) {
  const user = await User.findById(userId);

  if (!user) {
    throw new Error("User not found!");
  }

  // Initialize fields if they don't exist (for old users)
  if (user.totalStorage === undefined) {
    user.totalStorage = 15360; // 15 GB default
  }
  if (user.usedStorage === undefined) {
    user.usedStorage = 0;
  }
  if (user.storageSize === undefined) {
    user.storageSize = user.totalStorage;
  }

  // Increase available storage
  user.storageSize += size;
  
  // Decrease used storage (but don't go below 0)
  user.usedStorage = Math.max(0, user.usedStorage - size);

  // Make sure storageSize doesn't exceed totalStorage
  if (user.storageSize > user.totalStorage) {
    user.storageSize = user.totalStorage;
  }

  await user.save();

  console.log(` Storage restored for user ${userId}:`);
  console.log(`   - File size: ${size.toFixed(2)} MB`);
  console.log(`   - Used storage: ${user.usedStorage.toFixed(2)} MB`);
  console.log(`   - Available storage: ${user.storageSize.toFixed(2)} MB`);
  console.log(`   - Usage: ${((user.usedStorage / user.totalStorage) * 100).toFixed(2)}%`);

  return {
    usedStorage: user.usedStorage,
    storageSize: user.storageSize,
    totalStorage: user.totalStorage,
  };
}

module.exports = { decreaseStorage, increaseStorage };