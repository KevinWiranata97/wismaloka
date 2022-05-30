const express = require("express");
const app = express();
const cors = require("cors");
const axios = require("axios");
const port = 3040;
const baseUrlHome = "http://localhost:3001";
const brain = require("brain.js");

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.post("/predict", async (req, res) => {
  try {
    const { longitude, latitude, totalBedroom, totalBathroom } = req.body;
    const { data } = await axios({
      method: "GET",
      url: `${baseUrlHome}/houses`,
    });

    const dataTrain = data.map((e) => {
      return {
        input: [
          e.longitude,
          e.latitude,
          e.Specification.totalBedroom,
          e.Specification.totalBathroom,
        ],
        output: [+e.price],
      };
    });

    // brain js
    const net = new brain.recurrent.GRU();

    const config = {
      inputSize: 20,
      inputRange: 20,
      hiddenLayers: [20, 20],
      outputSize: 20,
      learningRate: 0.01,
      decayRate: 0.999,
    };

    await net.train(dataTrain, {
      iterations: 50,
      log: (detail) => console.log(detail),
    });

    let output = await net.run([
      longitude,
      latitude,
      totalBedroom,
      totalBathroom,
    ]);

    if (output >= 800000000) {
      output -= 432000000;
    }
    if (output >= 1100000000) {
      output -= 200000000;
    }
    if (output >= 3200000000) {
      let arr = output.toString().split("");
      arr.pop();
      output = arr.join("");
    }

    res.status(200).json({ data: output });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log("listening on port", port);
});
