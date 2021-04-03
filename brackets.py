def check_brackets(expr):
    stack = []

    for i in expr:

        if i == "(" or i == "[" or i == "{":
            stack.append(i)

        elif i == ")" or i == "]" or i == "}":
            if len(stack) <= 0:
                return False

            else:
                if i == ')':
                    for j in stack:
                        if j == '(':
                            stack.pop(stack.index(j))

                if i == ']':
                    for j in stack:
                        if j == '[':
                            stack.pop(stack.index(j))


                if i == '}':
                    for j in stack:
                        if j == '{':
                            stack.pop(stack.index(j))

    if len(stack) > 0 or expr == "":
        return False
    return True
                    
tests = [
"(a[0]+[2c[6]]){24 + 53}",
"f(e(d))",
"[()]\{\}([])",
"((b)",
"(c]",
"{(a[])",
"([)]",
")(",
""
] 

# for t in tests: 
print(tests[6], check_brackets(tests[6]))
