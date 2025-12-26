import {defineStore} from 'pinia';
import axios from 'axios';
const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const useDataStore = defineStore('data', {
  state: () => ({
    match: [],
    match_total: null,
    turn: [],
    turn_total: null,
    user: [],
    user_total: null,
    items: [],
    temp_turns: [],
    profile: [],
    last_matches: [],
    temp_matches: [],
    errorMessage: "",
    errorCode: "",
  }),
  actions: {
    async get_matches(page = 0, perpage = 10){
      this.errorMessage = ""
      try {
        const response = await axios.get(backendUrl + '/match', {
          params: {
            page: page,
            perpage: perpage,
          }
        });
        this.match = response.data;
      }
      catch(error){
        if (error.response)
        {
          this.errorMessage = error.response.data.message;
          console.log(error);
        } else if (error.request)
        {
          this.errorMessage = error.message;
          console.log(error);
        } else {
          console.log(error);
        }
      }
    },
    async get_matches_total(){
      this.errorMessage = "";
      try
      {
        const response = await axios.get(backendUrl + '/match_total');
        this.match_total = response.data;
      }
      catch (error) {
        if (error.response)
        {
          this.errorMessage = error.response.data.message;
          console.log(error);
        } else if (error.request)
        {
          this.errorMessage = error.message;
          console.log(error);
        } else {
          console.log(error);
        }
      }
    },
    async get_turns(page = 0, perpage = 10, id){
      this.errorMessage = ""
      try {
        const response = await axios.get(backendUrl + '/match/' + id  , {
          params: {
            page: page,
            perpage: perpage * 2,
          }
        });

        this.temp_turn = response.data;
        this.turn = [];
        for (let i = 0; i < this.temp_turn.length; i+=2){
          let white = "";
          if (this.temp_turn[i].figure != 'p')
            white += this.temp_turn[i].figure;
          white += this.temp_turn[i].fieldFrom;
          if (this.temp_turn[i].capture)
            white += 'x';
          else
            white += '-';
          white += this.temp_turn[i].fieldTo;
          if (this.temp_turn[i].draw)
            white += '+'
          if (this.temp_turn[i].mate)
            white += '#'
          let black = "";
          if (this.temp_turn[i+1] != null)
          {
            if (this.temp_turn[i+1].figure != 'p')
              black += this.temp_turn[i+1].figure;
            black += this.temp_turn[i+1].fieldFrom;
            if (this.temp_turn[i+1].capture)
              black += 'x';
            else
              black += '-';
            black += this.temp_turn[i+1].fieldTo;
            if (this.temp_turn[i+1].draw)
              black += '+';
            if (this.temp_turn[i+1].mate)
              black += '#';
          }
          this.turn.push({id: Math.floor(this.temp_turn[i].turnNumber/2)+1, white: white, black: black})
        }
      }
      catch(error){
        if (error.response)
        {
          this.errorMessage = error.response.data.message;
          console.log(error);
        } else if (error.request)
        {
          this.errorMessage = error.message;
          console.log(error);
        } else {
          console.log(error);
        }
      }
    },
    async get_turns_total(id){
      this.errorMessage = "";
      try
      {
        const response = await axios.get(backendUrl + '/turn_total/' +id);
        this.turn_total = Math.trunc(response.data / 2) + 1;
      }
      catch (error) {
        if (error.response)
        {
          this.errorMessage = error.response.data.message;
          console.log(error);
        } else if (error.request)
        {
          this.errorMessage = error.message;
          console.log(error);
        } else {
          console.log(error);
        }
      }
    },
    async get_users(page = 0, perpage = 10){
      this.errorMessage = ""
      try {
        const response = await axios.get(backendUrl + '/user', {
          params: {
            page: page,
            perpage: perpage,
          }
        });
        this.user = response.data;
      }
      catch(error){
        if (error.response)
        {
          this.errorMessage = error.response.data.message;
          console.log(error);
        } else if (error.request)
        {
          this.errorMessage = error.message;
          console.log(error);
        } else {
          console.log(error);
        }
      }
    },
    async get_users_total(){
      this.errorMessage = "";
      try
      {
        const response = await axios.get(backendUrl + '/user_total');
        this.user_total = response.data;
      }
      catch (error) {
        if (error.response)
        {
          this.errorMessage = error.response.data.message;
          console.log(error);
        } else if (error.request)
        {
          this.errorMessage = error.message;
          console.log(error);
        } else {
          console.log(error);
        }
      }
    },
    async create_user(formData)
    {
      this.errorMessage = "";
      try
      {
        const response = await axios.post(backendUrl + '/user/create', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
        }
        );
        this.errorCode = response.data.code;
        this.errorMessage = response.data.message;
      }
      catch (error) {
        if (error.response)
        {
          this.errorCode = 11;
          this.errorMessage = error.response.data.message;
          console.log(error);
        }
        else if (error.request)
        {
          this.errorCode = 12;
          this.errorMessage = error.message;
          console.log(error);
        }
        else {
          this.errorCode = 13;
          console.log(error);
        }
      }
    },
    async update_user(id, formData)
    {
      this.errorMessage = "";
      try
      {
        const response = await axios.post(backendUrl + '/user/update/' + id, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            },
          }
        );
        this.errorCode = response.data.code;
        this.errorMessage = response.data.message;
      }
      catch (error) {
        if (error.response)
        {
          this.errorCode = 11;
          this.errorMessage = error.response.data.message;
          console.log(error);
        }
        else if (error.request)
        {
          this.errorCode = 12;
          this.errorMessage = error.message;
          console.log(error);
        }
        else {
          this.errorCode = 13;
          console.log(error);
        }
      }
    },
    async get_user(id)
    {
      this.errorMessage = "";
      try
      {
        const response = await axios.get(backendUrl + '/user/' +id);
        this.profile = response.data;
      }
      catch (error) {
        if (error.response)
        {
          this.errorMessage = error.response.data.message;
          console.log(error);
        } else if (error.request)
        {
          this.errorMessage = error.message;
          console.log(error);
        } else {
          console.log(error);
        }
      }
    },
    async get_last_5_matches_by_id(id){
      this.errorMessage = ""
      try {
        const response = await axios.get(backendUrl + '/user_matches/' + id);
        this.last_matches =   response.data;
      }
      catch(error){
        if (error.response)
        {
          this.errorMessage = error.response.data.message;
          console.log(error);
        } else if (error.request)
        {
          this.errorMessage = error.message;
          console.log(error);
        } else {
          console.log(error);
        }
      }
    },
  }
})
