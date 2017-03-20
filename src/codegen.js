import {
  AST_FUNCTION,
  AST_CONDITION,
  AST_FUNCTION_CALL,
  AST_VARIABLE,
  AST_CONSTANT
} from './parser'

import {
  ADD,
  SUBSTRACT,
  MULTIPLE,
  DIVIDE,
  CONST,
  PRINT,
  EQUAL_TO,
  GREATER_THAN,
  GREATER_AND_EQUAL_THAN,
  LESS_THAN,
  LESS_AND_EQUAL_THAN,
  AND,
  OR,
  IF_FALSE_JUMP,
  JUMP,
  LOAD,
  CALL,
  RETURN
} from './vm'

const builtins = {
  '+': ADD,
  '-': SUBSTRACT,
  '*': MULTIPLE,
  '/': DIVIDE,
  '<': LESS_THAN,
  '>': GREATER_THAN,
  '<=': LESS_AND_EQUAL_THAN,
  '>=': GREATER_AND_EQUAL_THAN,
  'display': PRINT,
  '&&': AND,
  '||': OR,
  '==': EQUAL_TO
}

export default (ast) => {
  const bytecodes = []
  const log = (astNode) => console.log(`Code generation ${astNode.type}`, astNode)
  ast.forEach(generateBytecodes)

  function generateBytecodes (astNode) {
    if (astNode.type === AST_FUNCTION_CALL) {
      log(astNode)
      astNode.args.forEach(generateBytecodes)
      const builtinFunc = builtins[astNode.name]
      if (builtinFunc !== undefined) {
        console.log('Using builtin', astNode.name, builtinFunc)
        bytecodes.push(builtinFunc)
      } else {
        console.log('should generate function for ', astNode.name)
      }
    } else if (astNode.type === AST_CONSTANT) {
      bytecodes.push(CONST, astNode.value)
    }
  }

  return bytecodes
}
