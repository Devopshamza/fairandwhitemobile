export default {
  mode: 'development',
  getServerUrl() {
    if (this.mode === 'development ') {
      return `http://localhost:4000/api/v1/`;
    } else {
      return `https://productServe.com/api/v1/`;
    }
  },
};
