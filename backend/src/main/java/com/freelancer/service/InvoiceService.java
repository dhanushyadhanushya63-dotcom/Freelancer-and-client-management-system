package com.freelancer.service;

import com.freelancer.model.Invoice;
import com.freelancer.repository.InvoiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Service
public class InvoiceService {

    @Autowired
    private InvoiceRepository invoiceRepository;

    public List<Invoice> getAllInvoices() {
        return invoiceRepository.findAll();
    }

    public Invoice getInvoiceById(Long id) {
        return invoiceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Invoice not found with id: " + id));
    }

    public Invoice createInvoice(Invoice invoice) {
        if (invoice.getInvoiceNumber() == null) {
            invoice.setInvoiceNumber("INV-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());
        }
        if (invoice.getIssueDate() == null) invoice.setIssueDate(LocalDate.now().toString());
        if (invoice.getStatus() == null) invoice.setStatus("draft");
        if (invoice.getItems() != null) {
            invoice.getItems().forEach(item -> item.setInvoice(invoice));
        }
        return invoiceRepository.save(invoice);
    }

    public Invoice updateInvoice(Long id, Invoice updated) {
        Invoice existing = getInvoiceById(id);
        existing.setStatus(updated.getStatus());
        existing.setDueDate(updated.getDueDate());
        existing.setNotes(updated.getNotes());
        existing.setSubtotal(updated.getSubtotal());
        existing.setTax(updated.getTax());
        existing.setTotal(updated.getTotal());
        return invoiceRepository.save(existing);
    }

    public void deleteInvoice(Long id) {
        invoiceRepository.deleteById(id);
    }
}
