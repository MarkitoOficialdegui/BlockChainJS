const SHA256 = require('crypto-js/sha256');

class Block {
    constructor(index, data, hashAnt = ''){
        this.index = index;
        this.date = new Date();
        this.data = data;
        this.hashAnt = hashAnt;
        this.hash = this.crearHash();
        this.nonce = 0;
    }

    crearHash() {
        return SHA256(this.index + this.date + this.data + this.hashAnt + this.nonce).toString();
    }

    minar(dificultad) {
        while(!this.hash.startsWith(dificultad)) {
            this.nonce++;
            this.hash = this.crearHash();
        }
    }
}

class BlockChain {
    constructor(genesis, dificultad = '00'){
        this.chain = [this.createFirstBlock(genesis)]; 
        this.dificultad = dificultad;
    }
    createFirstBlock(genesis){
        return new Block(0,genesis);
    }
    getLastBlock() {
        return this.chain[this.chain.length-1];
    }
    addBlock(data){
        let prevBlock = this.getLastBlock();
        let block = new Block(prevBlock.index+1, data, prevBlock.hash);
        block.minar(this.dificultad);
        console.log('Minado!'+block.nonce);
        this.chain.push(block);
    }
    isValid() {
        for(let i=1; i < this.chain.length; i++){
            let prevBlock = this.chain[i-1];
            let currBlock = this.chain[i];

            if(currBlock.hashAnt != prevBlock.hash)
                return false;
            
            if(currBlock.crearHash() != currBlock.hash)
                return false;
        }
        return true;
    }
}

let argCoin = new BlockChain('info primer bloque','00');

argCoin.addBlock('info bloque 2');
argCoin.addBlock('info bloque 3');


console.log(argCoin.chain);
