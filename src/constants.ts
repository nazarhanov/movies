const options = {
  GH_REPO_URL: "/movies",
  API_KEY: "8c8e1a50-6322-4135-8875-5d40a5420d86",
  API_BASE: "https://kinopoiskapiunofficial.tech",
};

export default options;

export const route = (url: string) => {
  return options.GH_REPO_URL + url;
};
