var matrix = [];

function log (text) {
  console.log(text)
  if (document) document.querySelector('#salida').innerText += text + '\n'
}

window.onload = function() {
    var fileInput = document.getElementById('file');

    fileInput.addEventListener('change', function(e) {
        var file = fileInput.files[0];
        var textType = /text.*/;

        if (file.type.match(textType)) {
            var reader = new FileReader();

            reader.onload = function(e) {
                var lines = this.result.split('\n');
                processData(lines);
            }

            reader.readAsText(file);    
        } else {
            log("File not supported!");
        }
    });
}

function processData(input) {
    var index = 0;
    document.getElementById('salida').innerHTML = "";
    var test_cases = input[index];
    if(1<=test_cases && test_cases<=50){
        while(test_cases>0){
            index++;
            var defines = input[index].split(" ");
            var N = parseInt(defines[0]);
            var M = defines[1];
            if (1<=N && N<=100){
                matrix = [];
                matrix = math.zeros(N, N, N);
                if(1<=M && M<=1000){
                    while(M>0){
                        index++;
                        var operation_line = input[index].split(" ");
                        var operation = operation_line[0];
                        if(operation === "UPDATE"){
                            var w = Math.pow(10, 9);
                            var x = parseInt(operation_line[1]-1);
                            var y = parseInt(operation_line[2]-1);
                            var z = parseInt(operation_line[3]-1);
                            var W = parseInt(operation_line[4]);
                            if((0<=x && x<=N)&&(0<=y && y<=N)&&(0<=z && z<=N)&& (W > -(w) && W <= w)){
                              matrix.subset(math.index(x,y,z),W);
                            }
                        }else if(operation === "QUERY"){
                            var x1 = parseInt(operation_line[1]-1);
                            var y1 = parseInt(operation_line[2]-1);
                            var z1 = parseInt(operation_line[3]-1);
                            var x2 = parseInt(operation_line[4]-1);
                            var y2 = parseInt(operation_line[5]-1);
                            var z2 = parseInt(operation_line[6]-1);
                            if((0<=x1 && x1<=x2 && x2<=N)&&(0<=y1 && y1<=y2 && y2<=N)&&(0<=z1 && z1<=z2 && z2<=N)){
                                query(x1,y1,z1,x2,y2,z2);
                            }
                        }else{
                            log("Esta operación no es valida");
                        }
                        M--;
                    }
                }
            }
            test_cases--;
        }
    }
} 

function query(x_1,y_1,z_1,x_2,y_2,z_2){
    var sum = 0;
    var small_matrix = matrix.subset(math.index(math.range(x_1,x_2,true),math.range(y_1,y_2,true),math.range(z_1,z_2,true)));7
    log(math.sum(small_matrix));
}