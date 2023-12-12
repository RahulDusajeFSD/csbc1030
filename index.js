


const fs = require('fs').promises;

const inputFilePath = 'sample_input_numbers.json';
const outputFilePath = 'sample_output_numbers.json';

const readFromFile =  async (path) => { 
    const fileData =  await fs.readFile(path, 'utf-8');
    return fileData;

}

const modifyData = (inputData) => {

    const modifiedData = inputData.map(number => number*2);
    const jsonOutputData = JSON.stringify({numbers: modifiedData});
    return jsonOutputData;


}

const publishToFile = async (modifiedData, path) =>{
    const fileData = await fs.writeFile(path, modifiedData, 'utf-8');
}
;


const main = async () =>{

 const jsonData = JSON.parse(await readFromFile(inputFilePath)).numbers;

 modifyData(jsonData);

 publishToFile(await modifyData(jsonData), outputFilePath);

}

main();





