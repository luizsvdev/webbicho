package br.com.webbicho.server.shared.models.entities

import br.com.webbicho.server.shared.models.entities.user.User
import jakarta.persistence.*
import java.time.Instant
import java.util.*

@MappedSuperclass
abstract class WbEntity(
	@Id
	@GeneratedValue(strategy = GenerationType.UUID)
	var uuid: UUID? = null,
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "created_by", referencedColumnName = "uuid", updatable = false)
	var createdBy: User? = null,
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "updated_by", referencedColumnName = "uuid", insertable = false)
	var updatedBy: User? = null,
	
	@Column(updatable = false)
	var createdAt: Instant? = null,
	
	var updatedAt: Instant? = null,
	
	@Column(nullable = true)
	var deletedAt: Instant? = null,
) {
	@PrePersist
	private fun prePersist() {
		createdAt = Instant.now()
	}
	
	@PreUpdate
	private fun preUpdate() {
		updatedAt = Instant.now()
	}
}
