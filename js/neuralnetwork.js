var inputs = 4; //4 input nodes
var hidden1 = 8; //8 nodes in first hidden layer 
var hidden2 = 8; //8 nodes in second hidden layer 
var output = 1;  //1 output layer for testing (the real neural network would have an output node for each programme)
var r = 0.1; //Learning rate
var c = 0; //Initial cost

const dataIn = []; //Training data input would go here
const dataOut = []; //Training data output would go here

//Generate the nodes based on the provided node count
function nodeGenerator(nodeType) {
    var i = 0;
    var out = [];
    var currentNode = 0;
    while (i < nodeType) {
        out.push(currentNode);
        i++;
    }
    return out;
}

//Randomly generate the weights that connect nodes
function weightBuilder(leftLayer, rightLayer) {
    var i = 0;
    var weightsNeeded = leftLayer * rightLayer;
    var weights = []
    while (i < weightsNeeded) {
        weights.push(Math.random() - 0.5);
        i++;
    }
    return weights;
}

function sigmoid(x) {
    return 1/(1+Math.pow(Math.E, -x));
}

//Forward propagate through the network
function forward(hiddenArray1, hiddenArray2, w1, w2, w3, outputArray, inNode1, inNode2, inNode3, inNode4) {
    var i = 0;
    //Calculate node values in hiddenLayer1
    while (i < hiddenArray1.length) {
        hiddenArray1[i] = sigmoid((inNode1 * w1[i]) + (inNode2 * w1[i + 8]) + (inNode3 * w1[i + 16]) + (inNode4 * w1[i + 24]));
        i++;
    }
    i = 0;
    //Calculate node values in hiddenLayer2
    while (i < hiddenArray2.length) {
        hiddenArray2[i] = sigmoid((hiddenArray1[0] * w2[i]) + 
                          (hiddenArray1[1] * w2[i + 8]) + 
                          (hiddenArray1[2] * w2[i + 16]) + 
                          (hiddenArray1[3] * w2[i + 24]) +
                          (hiddenArray1[4] * w2[i + 32]) +
                          (hiddenArray1[5] * w2[i + 40]) +
                          (hiddenArray1[6] * w2[i + 48]) +
                          (hiddenArray1[7] * w2[i + 56]));
        i++;
    }
    i = 0;
    //Calculate node values in outputLayer
    outputArray[0] = sigmoid((hiddenArray2[0] * w3[0]) + 
                     (hiddenArray2[1] * w3[1]) + 
                     (hiddenArray2[2] * w3[2]) + 
                     (hiddenArray2[3] * w3[3]) +
                     (hiddenArray2[4] * w3[4]) +
                     (hiddenArray2[5] * w3[5]) +
                     (hiddenArray2[6] * w3[6]) +
                     (hiddenArray2[7] * w3[7]));
    return outputArray;
}

//Calulate the loss derivative (also known as network cost)
function calculateLoss(actual, predicted) { 
    //cost = (actual - predicted) to the power of 2 (Sum of squares)
}

//Backwards propagate through the network
function backwards() {
    //Starting at the right and working to the left, adjust each weight to decrease cost value
    //Weight in w3 layer effects cost via 𝛿C/𝛿w where C = cost and w = current weight. 𝛿C/𝛿w = 𝛿outputNode/𝛿w * 𝛿C/𝛿outputNode
    //Weight in w2 layer effects cost via 𝛿C/𝛿w where C = cost and w = current weight. 𝛿C/𝛿w = 𝛿hidden2/𝛿w * 𝛿hidden1/𝛿hidden2 * 𝛿C/𝛿outputNode
    //Weight in w1 layer effects cost via 𝛿C/𝛿w where C = cost and w = current weight. 𝛿C/𝛿w = 𝛿hidden1/𝛿w * 𝛿input/𝛿hidden1 * 𝛿hidden1/𝛿hidden2 * 𝛿C/𝛿outputNode
}

//To train the network
function train() {
    for (var i = 0; i < 100; i++) { //Train the network 100 times
        //backwards propagate 
        //forward propagate
        //calculate cost
    }
}

//Generate and populate the network
function neuralnet() {
    //Generate the nodes
    var inputArray = nodeGenerator(inputs);
    var hiddenArray1 = nodeGenerator(hidden1);
    var hiddenArray2 = nodeGenerator(hidden2);
    var outputArray = nodeGenerator(output);

    //Build the weights
    var w1 = weightBuilder(inputArray.length, hiddenArray1.length);
    var w2 = weightBuilder(hiddenArray1.length, hiddenArray2.length);
    var w3 = weightBuilder(hiddenArray2.length, outputArray.length);

    //Get the data from the sliders - this will be the value for the input nodes
    var node1 = (document.getElementById("input1").value / 100); //scale the number down so the numbers don't get too big
    var node2 = (document.getElementById("input2").value / 100);
    var node3 = (document.getElementById("input3").value / 100);
    var node4 = (document.getElementById("input4").value / 100);

    //Forward propagate throught the network to give a result (No training so the result is random)
    outputArray = forward(hiddenArray1, hiddenArray2, w1, w2, w3, outputArray, node1, node2, node3, node4);

    //Train the network
    //train();

    //Update the label to show the output node
    document.getElementById("updateMe").innerHTML = Math.round(outputArray * 100); //Scale the number back up 
}