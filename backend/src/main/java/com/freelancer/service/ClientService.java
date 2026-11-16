package com.freelancer.service;

import com.freelancer.model.Client;
import com.freelancer.repository.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;

@Service
public class ClientService {

    @Autowired
    private ClientRepository clientRepository;

    public List<Client> getAllClients() {
        return clientRepository.findAll();
    }

    public Client getClientById(Long id) {
        return clientRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Client not found with id: " + id));
    }

    public Client createClient(Client client) {
        client.setCreatedAt(LocalDate.now().toString());
        if (client.getStatus() == null) client.setStatus("active");
        return clientRepository.save(client);
    }

    public Client updateClient(Long id, Client updated) {
        Client existing = getClientById(id);
        existing.setName(updated.getName());
        existing.setEmail(updated.getEmail());
        existing.setPhone(updated.getPhone());
        existing.setCompany(updated.getCompany());
        existing.setStatus(updated.getStatus());
        existing.setLocation(updated.getLocation());
        existing.setIndustry(updated.getIndustry());
        existing.setNotes(updated.getNotes());
        return clientRepository.save(existing);
    }

    public void deleteClient(Long id) {
        clientRepository.deleteById(id);
    }
}
