// enquanto a order nao estiver paga, ele pode receber mais itens
// quando a order for paga, ele nao pode mais receber itens
//

// lucas - qrcode X
// lucas - table X
// lucas - store X
// lucas - order X, Y -> agua e um pastel
// finaliza o pedido do qrcodeId X -> todas as orders do qrcodeId que estao com o status DONE -> PAID

// agua -> pastel 15 min
// agua -> isDone = true
// pastel -> isDone = false
// a ordem so passa pra DONE quando todos os itens estiverem isDone = true
// Order -> status = PREPARING
