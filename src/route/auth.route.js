const express = require('express')
const path = require('path')
const dotenv = require('dotenv')

const auth = express();

const MONGODB_URI = process.env.MONGODB_URI;


