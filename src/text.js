let text = 'abcddcabce'
var k = {}
let len = 0
let index = 0
let longest = 0
let begin = 0
for (let i of text) {
  if (k[i] == null) {
    k[i] = index
    len++
  } else {
    if (len > longest && k[i] >= begin) {
      longest = len
      begin = k[i] + 1
    }
    len = index - begin
  }
  index++
}
if (len > longest) {
  longest = len - 1
}
console.log(longest, text.slice(begin, begin + longest))




