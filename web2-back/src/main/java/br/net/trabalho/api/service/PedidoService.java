package br.net.trabalho.api.service;

import br.net.trabalho.api.model.*;
import br.net.trabalho.api.repository.*;
import br.net.trabalho.api.rest.dto.pedido.NovoPedidoRequestDTO;
import br.net.trabalho.api.rest.dto.pedido.RoupasNovoPedidoDTO;
import br.net.trabalho.api.shared.DateUtil;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;

@Service
public class PedidoService {
    private static final String PEDIDO_STATUS_INICIAL = "orcamento";
    private static final String PEDIDO_STATUS_PAGO = "pago";

    @Autowired
    private RoupaRepository repoRoupas;
    @Autowired
    private PedidoRepository repoPedidos;
    @Autowired
    private StatusRepository repoStatus;
    @Autowired
    private ClienteRepository repoClientes;
    @Autowired
    private PedidoRoupaRepository repoPedidoRoupa;
    @Autowired
    private PagamentoRepository repoPagamento;

    @Transactional
    public void pagarPedido(Long id, String metodo) {
        Pedido p = this.buscarPorId(id);
        Pagamento pagamento = new Pagamento();
        pagamento.setPedido(p);
        pagamento.setMetodo(metodo);
        pagamento.setValor(p.getPrecoTotal());
        pagamento.setData(new Date());
        repoPagamento.save(pagamento);
        p.setPagamento(pagamento);
        Status statusPagoDb = repoStatus.findByNome(PEDIDO_STATUS_PAGO);
        p.setStatus(statusPagoDb);
        repoPedidos.save(p);
    }

    @Transactional
    public Pedido buscarPorId(Long id) {
        return repoPedidos.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Pedido não encontrado, ID: " + id));
    }

    @Transactional
    public Pedido atualizarStatus(Long pedidoId, String status) {
        Pedido pedidoDb = repoPedidos.findById(pedidoId)
                .orElseThrow(() -> new IllegalArgumentException("Pedido não encontrado, ID: " + pedidoId));
        Status statusDb = repoStatus.findByNome(status);
        pedidoDb.setStatus(statusDb);
        repoPedidos.save(pedidoDb);
        return pedidoDb;
    }

    @Transactional
    public List<Pedido> buscarTodos(String status) {
        List<Pedido> pedidos;
        if (status == null) {
            pedidos = repoPedidos.findAll(Sort.by(Sort.Direction.ASC, "dataPedido"));
        } else {
            Long statusId = repoStatus.findByNome(status).getId();
            pedidos = repoPedidos.findByStatusIdOrderByDataPedidoAsc(statusId);
        }
        return pedidos;
    }

    @Transactional
    public List<Pedido> buscarPedidosPorCliente(Long clienteId, String status) {
        List<Pedido> pedidos;
        if (status == null) {
            pedidos = repoPedidos.findByClienteIdOrderByDataPedidoDesc(clienteId);
        } else {
            Long statusId = repoStatus.findByNome(status).getId();
            pedidos = repoPedidos.findByClienteIdAndStatusIdOrderByDataPedidoDesc(clienteId, statusId);
        }
        return pedidos;
    }

    @Transactional
    public Pedido criarPedido(NovoPedidoRequestDTO request) {
        LocalDate hoje = LocalDate.now();

        Pedido pedido = new Pedido();
        pedido.setPrazo(new Date());
        pedido.setDataPedido(LocalDateTime.now());

        Cliente clienteDb = repoClientes.findById(request.getClienteId())
                .orElseThrow(() -> new IllegalArgumentException("Cliente não encontrado, ID: " + request.getClienteId()));
        Status statusDb = repoStatus.findByNome(PEDIDO_STATUS_INICIAL);

        pedido.setCliente(clienteDb);
        pedido.setStatus(statusDb);
        pedido.setPrecoTotal(0);

        repoPedidos.save(pedido);

        HashMap<Long, Integer> roupaPrazos = new HashMap<>();
        HashMap<Long, Double> roupaPrecos = new HashMap<>();

        for (RoupasNovoPedidoDTO roupa: request.getRoupas()) {
            Long idRoupa = roupa.getId();
            int quantidade = roupa.getQuantidade();

            Roupa roupaDb = repoRoupas.findById(idRoupa)
                    .orElseThrow(() -> new IllegalArgumentException("Roupa não encontrada, ID: " + idRoupa));

            roupaPrazos.put(roupaDb.getId(), roupaDb.getPrazo());
            roupaPrecos.put(roupaDb.getId(), roupaDb.getPreco() * quantidade);

            PedidoRoupa pedidoRoupa = new PedidoRoupa();
            pedidoRoupa.getId().setPedidoId(pedido.getId());
            pedidoRoupa.getId().setRoupaId(idRoupa);
            pedidoRoupa.setPedido(pedido);
            pedidoRoupa.setRoupa(roupaDb);
            pedidoRoupa.setQuantidade(quantidade);

            repoPedidoRoupa.save(pedidoRoupa);
        }

        // settando prazo
        Integer maiorPrazo = acharMaiorInteger(roupaPrazos);
        Date prazo = DateUtil.converterParaDate(hoje.plusDays(maiorPrazo));
        pedido.setPrazo(prazo);
        

        // settando precoTotal
        Double precoTotal = somarValores(roupaPrecos);
        pedido.setPrecoTotal(precoTotal);

        repoPedidos.save(pedido);
        return pedido;
    }

    private static Integer acharMaiorInteger(HashMap<Long, Integer> map) {
        Map.Entry<Long, Integer> entryWithMaxValue = map.entrySet()
                .stream()
                .max(Map.Entry.comparingByValue())
                .orElse(null);

        if (entryWithMaxValue != null) {
            return entryWithMaxValue.getValue();
        } else {
            return null;
        }
    }

    private static Double somarValores(HashMap<Long, Double> map) {
        return map.values()
                .stream()
                .mapToDouble(Double::doubleValue)
                .sum();
    }
}
