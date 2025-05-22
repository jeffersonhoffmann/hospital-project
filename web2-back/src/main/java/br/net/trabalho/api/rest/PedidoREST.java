package br.net.trabalho.api.rest;

import br.net.trabalho.api.model.Pedido;
import br.net.trabalho.api.model.PedidoRoupa;
import br.net.trabalho.api.repository.PedidoRepository;

import br.net.trabalho.api.repository.ClienteRepository;
import br.net.trabalho.api.rest.dto.pedido.*;
import br.net.trabalho.api.service.PedidoService;
import br.net.trabalho.api.shared.DecimalUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
public class PedidoREST {
    @Autowired
    private PedidoService pedidoService;

    @Autowired
    private PedidoRepository pagamentoRepository;

    @PostMapping("/pedidos")
    public ResponseEntity<OrcamentoDTO> criar(@RequestBody NovoPedidoRequestDTO request) {
        Pedido pedidoCriado = pedidoService.criarPedido(request);
        OrcamentoDTO orcamento = new OrcamentoDTO();
        orcamento.setId(pedidoCriado.getId());
        orcamento.setPrazo(pedidoCriado.getPrazo());
        orcamento.setPrecoTotal(DecimalUtil.formatDecimal(pedidoCriado.getPrecoTotal()));
        return ResponseEntity.ok(orcamento);
    }

    @GetMapping("/pedidos")
    public List<PedidoDTO> buscarPedidos(
            @RequestParam(name="cliente", required = false) Long clienteId,
            @RequestParam(name="status", required = false) String status
    ) {
        List<Pedido> pedidos;
        if (clienteId != null) {
            pedidos = pedidoService.buscarPedidosPorCliente(clienteId, status);
        } else {
            pedidos = pedidoService.buscarTodos(status);
        }

        return mapListToPedidoDTO(pedidos);
    }

    @GetMapping("/pedidos/{id}")
    public PedidoDTO mudarStatus(@PathVariable Long id) {
        Pedido pedido = pedidoService.buscarPorId(id);
        return mapToPedidoDTO(pedido);
    }

    @PatchMapping("/pedidos/{id}/status")
    public void mudarStatus(@PathVariable Long id, @RequestBody MudarStatusPedidoDTO pedido) {
        pedidoService.atualizarStatus(id, pedido.getStatus());
    }

    @PostMapping("/pedidos/{id}/pagamento")
    public void pagamento(@PathVariable Long id, @RequestBody PagamentoPedidoDTO pagamento) {
        pedidoService.pagarPedido(id, pagamento.getMetodo());
    }

    @GetMapping("/receitaPorData")
    public List<Object[]> calcularReceitaPorData() {
        return pagamentoRepository.calcularReceitaPorData();
    }

    private List<PedidoDTO> mapListToPedidoDTO(List<Pedido> pedidos) {
        List<PedidoDTO> pedidosResponse = new ArrayList<>();

        for (Pedido pedido: pedidos) {
            PedidoDTO p = new PedidoDTO();
            p.setId(pedido.getId());
            List<PedidoRoupaDTO> roupas = new ArrayList<>();
            for (PedidoRoupa pr: pedido.getRoupas()) {
                PedidoRoupaDTO roupa = new PedidoRoupaDTO();
                roupa.setNome(pr.getRoupa().getNome());
                roupa.setQuantidade(pr.getQuantidade());
                roupas.add(roupa);
            }
            p.setRoupas(roupas);
            p.setPrazo(pedido.getPrazo());
            p.setStatus(pedido.getStatus().getNome());
            p.setPrecoTotal(DecimalUtil.formatDecimal(pedido.getPrecoTotal()));
            p.setDataPedido(pedido.getDataPedido());
            pedidosResponse.add(p);

        }

        return pedidosResponse;
    }

    private PedidoDTO mapToPedidoDTO(Pedido pedido) {
        PedidoDTO p = new PedidoDTO();
        p.setId(pedido.getId());
        List<PedidoRoupaDTO> roupas = new ArrayList<>();
        for (PedidoRoupa pr: pedido.getRoupas()) {
            PedidoRoupaDTO roupa = new PedidoRoupaDTO();
            roupa.setNome(pr.getRoupa().getNome());
            roupa.setQuantidade(pr.getQuantidade());
            roupas.add(roupa);
        }
        p.setRoupas(roupas);
        p.setPrazo(pedido.getPrazo());
        p.setStatus(pedido.getStatus().getNome());
        p.setPrecoTotal(DecimalUtil.formatDecimal(pedido.getPrecoTotal()));

        return p;
    }
}
