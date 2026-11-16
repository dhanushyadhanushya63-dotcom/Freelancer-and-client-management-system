package com.freelancer.service;

import com.freelancer.model.Project;
import com.freelancer.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ProjectService {

    @Autowired
    private ProjectRepository projectRepository;

    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    public Project getProjectById(Long id) {
        return projectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found with id: " + id));
    }

    public Project createProject(Project project) {
        if (project.getStatus() == null) project.setStatus("pending");
        return projectRepository.save(project);
    }

    public Project updateProject(Long id, Project updated) {
        Project existing = getProjectById(id);
        existing.setTitle(updated.getTitle());
        existing.setDescription(updated.getDescription());
        existing.setStatus(updated.getStatus());
        existing.setBudget(updated.getBudget());
        existing.setPaid(updated.getPaid());
        existing.setDeadline(updated.getDeadline());
        existing.setPriority(updated.getPriority());
        return projectRepository.save(existing);
    }

    public void deleteProject(Long id) {
        projectRepository.deleteById(id);
    }
}
