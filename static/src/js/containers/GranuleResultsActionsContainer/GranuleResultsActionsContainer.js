import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {
  withRouter
} from 'react-router-dom'

import actions from '../../actions'

import { getFocusedCollectionGranuleQuery } from '../../selectors/query'
import { getFocusedCollectionGranuleResults } from '../../selectors/collectionResults'
import { getFocusedCollectionId } from '../../selectors/focusedCollection'
import { getFocusedCollectionMetadata, getFocusedCollectionSubscriptions } from '../../selectors/collectionMetadata'
import { getFocusedProjectCollection } from '../../selectors/project'
import { getGranuleLimit } from '../../util/collectionMetadata/granuleLimit'
import { locationPropType } from '../../util/propTypes/location'

import GranuleResultsActions from '../../components/GranuleResults/GranuleResultsActions'

export const mapDispatchToProps = dispatch => ({
  onAddProjectCollection:
    collectionId => dispatch(actions.addProjectCollection(collectionId)),
  onRemoveCollectionFromProject:
    collectionId => dispatch(actions.removeCollectionFromProject(collectionId)),
  onSetActivePanelSection:
    panelId => dispatch(actions.setActivePanelSection(panelId)),
  onUpdateFocusedCollection:
    collectionId => dispatch(actions.updateFocusedCollection(collectionId)),
  onChangePath: path => dispatch(actions.changePath(path))
})

export const mapStateToProps = state => ({
  collectionMetadata: getFocusedCollectionMetadata(state),
  focusedCollectionId: getFocusedCollectionId(state),
  focusedProjectCollection: getFocusedProjectCollection(state),
  granuleQuery: getFocusedCollectionGranuleQuery(state),
  granuleSearchResults: getFocusedCollectionGranuleResults(state),
  project: state.project,
  subscriptions: getFocusedCollectionSubscriptions(state)
})

export const GranuleResultsActionsContainer = (props) => {
  const {
    collectionMetadata,
    focusedCollectionId,
    focusedProjectCollection,
    granuleQuery,
    granuleSearchResults,
    location,
    onAddProjectCollection,
    onChangePath,
    onRemoveCollectionFromProject,
    onSetActivePanelSection,
    project,
    subscriptions
  } = props

  const {
    collections
  } = project

  const {
    allIds: projectCollectionIds = []
  } = collections

  // Determine if the current collection is in the project
  const isCollectionInProject = projectCollectionIds.indexOf(focusedCollectionId) > -1

  const {
    hits: searchGranuleCount,
    isLoaded,
    isLoading
  } = granuleSearchResults

  const {
    pageNum = 1
  } = granuleQuery

  const initialLoading = ((pageNum === 1 && isLoading) || (!isLoaded && !isLoading))

  const granuleLimit = getGranuleLimit(collectionMetadata)

  const { granules: projectCollectionGranules = {} } = focusedProjectCollection
  const {
    hits: projectGranuleCount,
    addedGranuleIds = [],
    removedGranuleIds = []
  } = projectCollectionGranules

  return (
    <>
      <GranuleResultsActions
        addedGranuleIds={addedGranuleIds}
        focusedCollectionId={focusedCollectionId}
        focusedProjectCollection={focusedProjectCollection}
        granuleLimit={granuleLimit}
        initialLoading={initialLoading}
        isCollectionInProject={isCollectionInProject}
        location={location}
        onAddProjectCollection={onAddProjectCollection}
        onChangePath={onChangePath}
        onRemoveCollectionFromProject={onRemoveCollectionFromProject}
        onSetActivePanelSection={onSetActivePanelSection}
        projectCollectionIds={projectCollectionIds}
        projectGranuleCount={projectGranuleCount}
        removedGranuleIds={removedGranuleIds}
        searchGranuleCount={searchGranuleCount}
        subscriptions={subscriptions}
      />
    </>
  )
}

GranuleResultsActionsContainer.propTypes = {
  collectionMetadata: PropTypes.shape({}).isRequired,
  focusedCollectionId: PropTypes.string.isRequired,
  focusedProjectCollection: PropTypes.shape({}).isRequired,
  granuleQuery: PropTypes.shape({}).isRequired,
  granuleSearchResults: PropTypes.shape({}).isRequired,
  location: locationPropType.isRequired,
  onAddProjectCollection: PropTypes.func.isRequired,
  onChangePath: PropTypes.func.isRequired,
  onRemoveCollectionFromProject: PropTypes.func.isRequired,
  onSetActivePanelSection: PropTypes.func.isRequired,
  project: PropTypes.shape({}).isRequired,
  subscriptions: PropTypes.arrayOf(PropTypes.shape({})).isRequired
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(GranuleResultsActionsContainer)
)
