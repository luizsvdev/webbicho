package br.com.webbicho.server.shared.entities

import jakarta.persistence.*
import java.time.Instant
import java.util.*

@MappedSuperclass
abstract class WbEntity(
	@Id
	@GeneratedValue(strategy = GenerationType.UUID)
	
	var uuid: UUID? = null,
	
	/** @author Luiz Silva
	 * The foreign key for this field needs to be set manually throught changelog  */
	@Column(
		name = "created_by",
		updatable = false,
		nullable = false
	)
	var createdBy: UUID? = null,
	
	@Column(
		name = "updated_by",
		insertable = false,
		nullable = true
	)
	/** @author Luiz Silva
	 * The foreign key for this field needs to be set manually throught changelog  */
	var updatedBy: UUID? = null,
	
	@Column(updatable = false, nullable = false)
	var createdAt: Instant? = null,
	
	@Column(insertable = false, nullable = true)
	var updatedAt: Instant? = null,
	
	@Column(nullable = true, insertable = false)
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
