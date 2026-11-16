package com.freelancer.controller;

import com.freelancer.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    @Autowired
    private InvoiceRepository invoiceRepository;

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private ClientRepository clientRepository;

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private ExpenseRepository expenseRepository;

    @GetMapping("/summary")
    public ResponseEntity<Map<String, Object>> getSummary() {
        Map<String, Object> summary = new HashMap<>();

        summary.put("totalClients", clientRepository.count());
        summary.put("totalProjects", projectRepository.count());
        summary.put("activeProjects", projectRepository.findByStatus("in_progress").size());
        summary.put("totalInvoices", invoiceRepository.count());
        summary.put("paidInvoices", invoiceRepository.findByStatus("paid").size());
        summary.put("overdueInvoices", invoiceRepository.findByStatus("overdue").size());

        double totalRevenue = paymentRepository.findAll().stream()
                .mapToDouble(p -> p.getAmount() != null ? p.getAmount() : 0).sum();
        double totalExpenses = expenseRepository.findAll().stream()
                .mapToDouble(e -> e.getAmount() != null ? e.getAmount() : 0).sum();

        summary.put("totalRevenue", totalRevenue);
        summary.put("totalExpenses", totalExpenses);
        summary.put("netProfit", totalRevenue - totalExpenses);

        return ResponseEntity.ok(summary);
    }

    @GetMapping("/health")
    public ResponseEntity<Map<String, String>> health() {
        return ResponseEntity.ok(Map.of(
                "status", "UP",
                "app", "Freelancer Invoice & Client Management System",
                "version", "1.0.0"
        ));
    }
}
