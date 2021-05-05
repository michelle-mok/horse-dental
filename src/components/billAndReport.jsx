import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BillAndReport = () => {
  useEffect(() => {
    axios.get(`/billAndReport/${}`)
  })
}