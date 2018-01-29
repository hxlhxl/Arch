# 添加邮件菜单

ref: https://github.com/cmderdev/cmder/wiki/%5BWindows%5D-%22Open-Cmder-Here%22-in-context-menu

``` OpenCmderHere.reg
Windows Registry Editor Version 5.00

[HKEY_CLASSES_ROOT\Directory\Background\shell\Cmder]
@="Open Cmder Here"
"Icon"=hex(2):25,00,43,00,4D,00,44,00,45,00,52,00,5F,00,49,00,\
  4E,00,53,00,54,00,41,00,4C,00,4C,00,5F,00,44,00,49,00,52,00,25,\
  00,5C,00,69,00,63,00,6F,00,6E,00,73,00,5C,00,63,00,6D,00,64,00,65,\
  00,72,00,2E,00,69,00,63,00,6F,00

[HKEY_CLASSES_ROOT\Directory\Background\shell\Cmder\command]
@=hex(2):25,00,43,00,4d,00,44,00,45,00,52,00,5f,00,49,00,4e,00,\
  53,00,54,00,41,00,4c,00,4c,00,5f,00,44,00,49,00,52,00,25,00,5c,00,43,00,6d,\
  00,64,00,65,00,72,00,2e,00,65,00,78,00,65,00,20,00,2f,00,53,00,54,00,41,00,\
  52,00,54,00,20,00,22,00,25,00,76,00,22,00,00,00
  ```