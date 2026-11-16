package com.freelancer.service;

import com.freelancer.model.Expense;
import com.freelancer.repository.ExpenseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;

@Service
public class ExpenseService {

    @Autowired
    private ExpenseRepository expenseRepository;

    public List<Expense> getAllExpenses() {
        return expenseRepository.findAll();
    }

    public Expense getExpenseById(Long id) {
        return expenseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Expense not found with id: " + id));
    }

    public Expense createExpense(Expense expense) {
        if (expense.getDate() == null) expense.setDate(LocalDate.now().toString());
        return expenseRepository.save(expense);
    }

    public Expense updateExpense(Long id, Expense updated) {
        Expense existing = getExpenseById(id);
        existing.setCategory(updated.getCategory());
        existing.setAmount(updated.getAmount());
        existing.setDescription(updated.getDescription());
        existing.setDate(updated.getDate());
        existing.setVendor(updated.getVendor());
        return expenseRepository.save(existing);
    }

    public void deleteExpense(Long id) {
        expenseRepository.deleteById(id);
    }
}
