#include "stdio.h"
#include "stdlib.h"

int main() {
    FILE *fpt;  // 声明一个文件句柄
    char text[80];
    fpt = fopen("output.txt", "r"); // 打开文件，a.out和output.txt之间建立了一个stream
    fscanf(fpt, "%s", text);
    fclose(fpt);    // 关闭stream链接
    printf("content read from file below: \n%s", text);
    return 0;
}