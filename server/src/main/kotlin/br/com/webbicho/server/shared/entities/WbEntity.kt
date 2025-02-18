package br.com.webbicho.server.shared.entities

import br.com.webbicho.server.shared.annotations.WbGeneratedUUID
import jakarta.persistence.*
import java.time.Instant
import java.util.*

@MappedSuperclass
abstract class WbEntity(
	@Id
	@WbGeneratedUUID
	var uuid: UUID? = null,
	
	@Column(
		name = "created_by",
		updatable = false,
		nullable = true
	)
	var createdBy: UUID? = null,
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(
		name = "created_by",
		nullable = true,
		insertable = false,
		updatable = false,
	)
	private var createdByUser: User? = null,
	
	@Column(
		name = "updated_by",
		insertable = false,
		nullable = true
	)
	var updatedBy: UUID? = null,
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(
		name = "updated_by",
		nullable = true,
		insertable = false,
		updatable = false,
	)
	private var updatedByUser: User? = null,
	
	
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
