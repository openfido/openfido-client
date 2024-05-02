// This file is meant to consolidate all utility function calls required to interact with the Github API

import axios from 'axios';

/// // END OF IMPORTS /////

// api scrape within openfido for all pipeline repositories
const potentialPipelines = `https://api.github.com/search/repositories?q=${encodeURIComponent('org:openfido "Pipeline status" in:readme')}`;

const gitApi = {

  getPotentialPipelines: async () => {
    try {
      const response = await axios.get(potentialPipelines);
      const data = response.data.items;
      const cleanData = data.map((repo) => {
        const reducedData = {};
        reducedData.full_name = repo.name;
        reducedData.url = repo.url;
        reducedData.id = repo.id;
        reducedData.description = repo.description;
        return reducedData;
      });
      return cleanData;
    } catch (err) {
      console.log(err);
    }
  },

  getManifest: async (url, branch) => {
    let temp = `${url}/contents/manifest.json`;
    if (branch !== undefined) {
      temp = `${temp}?ref=${branch}`;
    }
    try {
      const response = await axios({
        method: 'get',
        url: temp,
        headers: {
          accept: 'application/vnd.github.VERSION.raw',
        },
      });
      return response.data;
    } catch (err) {
      console.log(err);
    }
  },

};

export default gitApi;
