function getElement(node)
{
  while(node && node.nodeType !=1)
  {
    node = node.nextSibling;
  }
  return node;
}
