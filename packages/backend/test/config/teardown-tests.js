module.exports = async () => {
  try {
    // do nothing currently
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    console.log('Test teardown completed...');
  }
};
