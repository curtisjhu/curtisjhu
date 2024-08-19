async function showExamples(data) {
    // Create a container in the visor
    const surface = tfvis
        .visor()
        .surface({ name: "Input Data Examples", tab: "Input Data" });

    // Get the examples
    const examples = data.nextTestBatch(20);
    const numExamples = examples.xs.shape[0];

    // Create a canvas element to render each example
    for (let i = 0; i < numExamples; i++) {
        const imageTensor = tf.tidy(() => {
            // Reshape the image to 28x28 px
            return examples.xs
                .slice([i, 0], [1, examples.xs.shape[1]])
                .reshape([28, 28, 1]);
        });

        const canvas = document.createElement("canvas");
        canvas.width = 28;
        canvas.height = 28;
        canvas.style = "margin: 4px;";
        await tf.browser.toPixels(imageTensor, canvas);
        surface.drawArea.appendChild(canvas);

        imageTensor.dispose();
    }
}

function getModel() {
    const IMAGE_WIDTH = 28;
    const IMAGE_HEIGHT = 28;
    const IMAGE_CHANNELS = 1;

    const input = tf.input({
        shape: [IMAGE_WIDTH, IMAGE_HEIGHT, IMAGE_CHANNELS],
    });

    const layer1 = tf.layers.conv2d({
        inputShape: [IMAGE_WIDTH, IMAGE_HEIGHT, IMAGE_CHANNELS],
        kernelSize: 5,
        filters: 8,
        strides: 1,
        activation: "relu",
        kernelInitializer: "varianceScaling",
    });
    const layer2 = tf.layers.maxPooling2d({
        poolSize: [2, 2],
        strides: [2, 2],
    });
    const layer3 = tf.layers.flatten();
    const layer4 = tf.layes.dense({
      units: 10,
      kernelInitializer: "varianceScaling",
      activation: "relu"
    });
    const layer5 = tf.layers.dense({
      units: 100,
      kernelInitializer: "varianceScaling",
      activation: "relu"
    });

    const NUM_OUTPUT_CLASSES = 10;
    const layer6 = tf.layers.dense({
        units: NUM_OUTPUT_CLASSES,
        kernelInitializer: "varianceScaling",
        activation: "softmax",
    });

    // Application
    const output1 = layer1.apply(input);
    const output2 = layer2.apply(output1);
    const output3 = layer3.apply(output2);
    const output4 = layer4.apply(output3);
    const output5 = layer5.apply(output4);
    const output6 = layer6.apply(output5);

    const model = tf.model({ inputs: input, outputs: [output6] });

    const optimizer = tf.train.adam();
    model.compile({
        optimizer: optimizer,
        loss: "categoricalCrossentropy",
        metrics: ["accuracy"],
    });

    return model;
}

var MODEL = [];
async function train(model, data) {
    const metrics = ["loss", "val_loss", "acc", "val_acc"];
    const container = {
        name: "Model Training",
        tab: "Model",
        styles: { height: "1000px" },
    };
    const fitCallbacks = tfvis.show.fitCallbacks(container, metrics);

    const BATCH_SIZE = 512;
    const TRAIN_DATA_SIZE = 5500;
    const TEST_DATA_SIZE = 1000;

    const [trainXs, trainYs] = tf.tidy(() => {
        const d = data.nextTrainBatch(TRAIN_DATA_SIZE);
        return [d.xs.reshape([TRAIN_DATA_SIZE, 28, 28, 1]), d.labels];
    });

    const [testXs, testYs] = tf.tidy(() => {
        const d = data.nextTestBatch(TEST_DATA_SIZE);
        return [d.xs.reshape([TEST_DATA_SIZE, 28, 28, 1]), d.labels];
    });

    const [sampleXs, sampleX, sampleYs] = tf.tidy(() => {
        const d = data.nextTestBatch(1);
        return [d.xs.reshape([1, 28, 28, 1]), d.xs.reshape([28, 28, 1]), d.labels];
    });

    async function onBatchBegin(batch, logs) {
      try{
        await tf.browser.toPixels(sampleX, document.getElementById("main"));

        // first layer 28 * 28
        const model1 = tf.model({
            inputs: model.inputs,
            outputs: model.layers[0].output,
        });
        const l1 = model1.predict(sampleXs);
        console.log(l1.shape)
        const l1arr = l1.reshape([28, 28, 1]);
        await tf.browser.toPixels(l1arr, document.getElementById("1"));

        const model2 = tf.model({
            inputs: model.inputs,
            outputs: model.layers[1].output,
        });
        const l2 = model2.predict(sampleXs);
        console.log(l2.shape)
        const l2arr = l2.reshape([24*4, 24*2, 1])
        await tf.browser.toPixels(l2arr, document.getElementById("2"));

        const model3 = tf.model({
            inputs: model.inputs,
            outputs: model.layers[2].output,
        });
        const l3 = model3.predict(sampleXs);
        console.log(l3.shape)
        const l3arr = l3.reshape([12*4, 12*2, 1]);
        await tf.browser.toPixels(l3arr, document.getElementById("3"));

        const model4 = tf.model({
            inputs: model.inputs,
            outputs: model.layers[3].output,
        });
        const l4 = model4.predict(sampleXs);
        console.log(l4.shape)
        const l4arr = l4.reshape([8*4, 8*4, 1]);
        await tf.browser.toPixels(l4arr, document.getElementById("4"));


        const model5 = tf.model({
            inputs: model.inputs,
            outputs: model.layers[4].output,
        });
        const l5 = model5.predict(sampleXs);
        console.log(l5.shape)
        const l5arr = l5.reshape([4*4, 4*4, 1]);
        await tf.browser.toPixels(l5arr, document.getElementById("5"));

        const model6 = tf.model({
            inputs: model.inputs,
            outputs: model.layers[5].output,
        });
        const l6 = model6.predict(sampleXs);
        console.log(l6.shape);
        const l6arr = l6.reshape([1, 256]);
        await tf.browser.toPixels(l6arr, document.getElementById("6"));

        const model7 = tf.model({
            inputs: model.inputs,
            outputs: model.layers[6].output,
        });
        const l7 = model7.predict(sampleXs);
        console.log(l7.shape);
        const l7arr = l7.reshape([1, 10]);
        await tf.browser.toPixels(l7arr, document.getElementById("7"));
      } catch(e) {
        console.error(e)
      }
    }

    return model.fit(trainXs, trainYs, {
        batchSize: BATCH_SIZE,
        validationData: [testXs, testYs],
        epochs: 10,
        shuffle: true,
        callbacks: { ...fitCallbacks, onBatchBegin },
    });
}

import { MnistData } from "./data.js";

async function run() {
    const data = new MnistData();
    await data.load();
    await showExamples(data);

    const model = getModel();
    await train(model, data);

    tfvis.show.modelSummary(
        { name: "Model Architecture", tab: "Model" },
        model
    );
}

document.addEventListener("DOMContentLoaded", run);
document.getElementById("toggle-button").addEventListener("click", () => {
    tfvis.visor().toggle();
});
document.getElementById("refresh-button").addEventListener("click", () => {
    document.location.reload();
});

// var sketch = (p) => {
//     p.setup = function () {
//         // 28 * 4
//         p.createCanvas(28, 28);
//         p.noLoop();
//     };
//     p.x = 0;
//     p.draw = function (MODEL) {
//         p.background(0);

//         // p.loadPixels();
//         // p.pixels = MODEL;
//         // let d = p.pixelDensity();
//         // for (var mi = 0; mi < MODEL.length; mi++) {
//         //   var x = MODEL[mi % 28], y = MODEL[Math.floor(mi / 28)];
//         //     for (let i = 0; i < d; i++) {
//         //         for (let j = 0; j < d; j++) {
//         //             let index = 4 * ((y * d + j) * p.width * d + (x * d + i));
//         //             p.pixels[index] = MODEL[mi];
//         //             p.pixels[index + 1] = MODEL[mi];
//         //             p.pixels[index + 2] = MODEL[mi];
//         //             p.pixels[index + 3] = 1;
//         //         }
//         //     }
//         // }
//         // p.updatePixels();
//     };
// };

// var p5instance;
// document.addEventListener("DOMContentLoaded", function () {
//     p5instance = new p5(sketch, document.getElementById("canvases"));
// });
