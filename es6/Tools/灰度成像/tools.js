    //Grey = 0.299*R + 0.587*G + 0.114*B
    function rgb2gray(R,G,B){ // rgb 转灰度
        return parseInt(0.299*R + 0.587*G + 0.114*B)
    }

    function grayscaleLevel(gray){ // 灰度评级函数
        if(gray>=0&&gray<=42){ // 很暗
            return 1
        }else if(gray<=84){ // 暗
            return 2
        }else if(gray<=127){ // 较暗
            return 3
        }else if(gray<=170){ // 灰
            return 4
        }else if(gray<=213){ // 亮
            return 5
        }else if(gray<=255){ // 很亮
            return 6
        }
    }

    function average(numbers){ // 计算一个数组的平均值 参数是数字组成的数组 返回值是数字
        var sum = 0 // 初始和
        var length = numbers.length // 总个数
        function getAverageVal(_numbers){ // 累加求平均值函数
            sum = sum + (_numbers[0] ? _numbers[0] : 0)
            if(_numbers.length<=1){
                return sum/length
            }
            return getAverageVal(_numbers.slice(1)) // 累加
        }
        return getAverageVal(numbers) // 调用累加求平均值函数
    }