$string_list = 'str1', 'str2', 'str3', ... 'str10'

$string_list | ForEach-Object {
  $var = "${_}xyz"   # alternatively: $var = $_ + 'xyz'
  svn co $var
}
pause